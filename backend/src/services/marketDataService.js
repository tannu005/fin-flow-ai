const axios = require('axios');
const mongoose = require('mongoose');

const MarketLogSchema = new mongoose.Schema({
  date: { type: String, unique: true },
  indices: Array,
  insights: Object,
  metadata: Object
});

let MarketLog;
try {
  MarketLog = mongoose.model('MarketLog');
} catch (e) {
  MarketLog = mongoose.model('MarketLog', MarketLogSchema);
}

const FALLBACK_DATA = {
  indices: [
    { symbol: "S&P 500", value: "5,917.30", change: "+0.85%", up: true, volatility: [40, 45, 42, 48, 55, 52, 60] },
    { symbol: "NASDAQ", value: "18,915.20", change: "+1.12%", up: true, volatility: [30, 35, 32, 45, 40, 50, 58] },
    { symbol: "BTC", value: "$77,012", change: "+2.45%", up: true, volatility: [20, 50, 30, 70, 40, 80, 60] },
    { symbol: "GOLD", value: "$4,512.50", change: "+1.24%", up: true, volatility: [10, 15, 12, 18, 20, 22, 25] },
    { symbol: "NIFTY 50", value: "23,925", change: "-0.74%", up: false, volatility: [60, 58, 62, 55, 57, 50, 52] }
  ],
  insights: {
    vix: 19.25,
    sentiment: "Caution",
    topSector: "Energy"
  }
};

async function fetchLiveMarketData() {
  const avKey = process.env.ALPHA_VANTAGE_API_KEY;
  let indices = [...FALLBACK_DATA.indices];

  // Fetch BTC from CoinGecko
  try {
    const btcRes = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
    if (btcRes.data.bitcoin) {
      const btcData = btcRes.data.bitcoin;
      const btcIdx = indices.findIndex(i => i.symbol === 'BTC');
      if (btcIdx !== -1) {
        indices[btcIdx].value = `$${btcData.usd.toLocaleString()}`;
        indices[btcIdx].change = `${btcData.usd_24h_change.toFixed(2)}%`;
        indices[btcIdx].up = btcData.usd_24h_change >= 0;
      }
    }
  } catch (e) { console.log("CoinGecko fetch failed."); }

  // Fetch S&P 500 from Alpha Vantage if key exists
  if (avKey && avKey !== 'your_alpha_vantage_key') {
    try {
      const spRes = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${avKey}`);
      if (spRes.data['Global Quote']) {
        const data = spRes.data['Global Quote'];
        const spIdx = indices.findIndex(i => i.symbol === 'S&P 500');
        if (spIdx !== -1) {
          indices[spIdx].value = parseFloat(data['05. price']).toLocaleString();
          indices[spIdx].change = data['10. change percent'];
          indices[spIdx].up = parseFloat(data['09. change']) >= 0;
        }
      }
    } catch (e) { console.log("Alpha Vantage fetch failed."); }
  }

  return {
    indices,
    insights: FALLBACK_DATA.insights,
    metadata: {
      timestamp: new Date().toISOString(),
      dataSource: avKey ? 'Hybrid (AV+CG)' : 'Fallback (Mock)',
      latency: '45ms'
    }
  };
}

const getDailyPulse = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const isConnected = mongoose.connection.readyState === 1;
    if (process.env.MONGODB_URI && isConnected) {
      try {
        const existing = await MarketLog.findOne({ date: today }).maxTimeMS(2000);
        if (existing) return { ...existing.toObject(), cacheStatus: 'HIT' };
      } catch (findError) {
        console.warn('MarketLog query failed, using live data:', findError.message);
      }
    }

    const newPulse = await fetchLiveMarketData();
    
    if (process.env.MONGODB_URI && isConnected) {
      const savedLog = await new MarketLog({ date: today, ...newPulse }).save();
      return { ...savedLog.toObject(), cacheStatus: 'FRESH' };
    }

    return { ...newPulse, cacheStatus: 'MOCK_FRESH' };
  } catch (error) {
    console.error("Pulse Engine Error:", error.message);
    return { ...FALLBACK_DATA, date: today, cacheStatus: 'ERROR_FALLBACK' };
  }
};

const getHistory = async (days = 7) => {
  try {
    if (!process.env.MONGODB_URI) return [];
    return await MarketLog.find().sort({ date: -1 }).limit(days);
  } catch (error) {
    return [];
  }
};

module.exports = { getDailyPulse, getHistory };
