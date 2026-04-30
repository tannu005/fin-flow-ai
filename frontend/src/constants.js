export const MOCK_ARTICLES = [
  {
    id: 'apr-30-1',
    headline: "Oil Hits $125/bbl Amid Strait of Hormuz Blockade",
    summary: "Global energy markets are in shock as the Strait of Hormuz remains blocked, disrupting 20% of world oil supply. Brent crude has surged to its highest level since 2022.",
    key_insights: [
      "10 million barrels/day supply shock identified.",
      "Global inflation forecast revised to 5.8%.",
      "Defensive sectors (Pharma, FMCG) showing relative strength."
    ],
    sentiment: "Negative",
    confidence: 96,
    impact: "High",
    projection: "Energy costs to tax corporate margins throughout Q2; expect continued pressure on Auto and Paint sectors.",
    category: "Economy",
    topics: ["Oil", "Stagflation", "Geopolitics"],
    source: "Bloomberg",
    date: "2026-04-30T16:45:00Z",
    url: "https://www.bloomberg.com/news/articles/2026-04-30/oil-prices-skyrocket-strait-of-hormuz"
  },
  {
    id: 'apr-30-2',
    headline: "Nifty 50 Dips to 23,925; 8% Correction Since Jan Peak",
    summary: "The Indian benchmark index has broken critical support levels as foreign institutional investors pull out amid global risk-off sentiment.",
    key_insights: [
      "VIX surged to 19.25, signaling extreme market fear.",
      "Reliance and ONGC benefiting from energy price spike.",
      "FII net outflows exceed $4B in April."
    ],
    sentiment: "Negative",
    confidence: 92,
    impact: "High",
    projection: "Support at 23,500 is critical; if broken, expect a slide toward 22,000 baseline.",
    category: "Markets",
    topics: ["Nifty 50", "VIX", "FII Outflows"],
    source: "Reuters",
    date: "2026-04-30T16:45:00Z",
    url: "https://www.reuters.com/business/markets/nifty-india-correction-2026-04-30/"
  },
  {
    id: 'jan-1',
    headline: 'January 2026: Nifty Hits All-Time High of 26,000',
    summary: 'The new year starts with a massive rally as foreign investment pours into the Indian tech and green energy sectors.',
    key_insights: ['FII inflows hit $5B in first week', 'Green energy index up 12%', 'Tech valuations reach new peaks'],
    category: 'Markets',
    source: 'Mint',
    sentiment: 'Positive',
    confidence: 94,
    impact: "High",
    projection: "The 26,000 level is a psychological barrier; consolidation is expected before the next leg up.",
    topics: ['New Year Rally', 'Nifty', 'FII'],
    date: '2026-01-15T09:00:00Z',
    url: 'https://www.livemint.com/market/stock-market-news/nifty-reaches-26000-milestone-january-2026'
  },
  {
    id: 'jan-2',
    headline: 'Sovereign AI: India Announces National Compute Grid',
    summary: 'The Indian government unveils a $10B plan to build a decentralized AI compute grid to reduce reliance on global cloud providers.',
    key_insights: ['100,000 GPUs to be deployed by 2027', 'Focus on local language models', 'Partnerships with domestic tech giants'],
    category: 'Tech',
    source: 'Economic Times',
    sentiment: 'Positive',
    confidence: 91,
    impact: "Medium",
    projection: "Long-term bullish for Indian hardware and infrastructure providers.",
    topics: ['AI', 'Sovereign AI', 'Infrastructure'],
    date: '2026-01-20T11:00:00Z',
    url: 'https://economictimes.indiatimes.com/tech/ites/india-ai-compute-grid-jan-2026'
  },
  {
    id: 'feb-1',
    headline: 'February 2026: Geopolitical Tensions Spark Energy Concerns',
    summary: 'As tensions rise in the Middle East, oil prices begin their upward climb, putting pressure on global shipping and logistics.',
    key_insights: ['Brent crude crosses $90/bbl', 'Shipping routes redirected', 'Inflation fears resurface'],
    category: 'Economy',
    source: 'Bloomberg',
    sentiment: 'Negative',
    confidence: 90,
    impact: "Medium",
    projection: "Expect increased volatility in energy-sensitive sectors like Auto and Aviation.",
    topics: ['Oil', 'Geopolitics', 'Energy'],
    date: '2026-02-10T14:00:00Z',
    url: 'https://www.bloomberg.com/news/energy/2026-02-10/oil-prices-rise-geopolitics'
  },
  {
    id: 'feb-2',
    headline: 'Bitcoin Stabilizes at $85k After ETF Inflow Surge',
    summary: 'Institutional adoption of Bitcoin continues as major pension funds allocate 1% of their portfolios to spot BTC ETFs.',
    key_insights: ['ETF inflows hit $10B in Feb', 'Volatility decreases as liquidity improves', 'Correlation with tech stocks weakening'],
    category: 'Crypto',
    source: 'CoinDesk',
    sentiment: 'Positive',
    confidence: 89,
    impact: "Medium",
    projection: "Bitcoin is maturing into a standard asset class; expect slower but steadier growth.",
    topics: ['Bitcoin', 'ETFs', 'Institutional Adoption'],
    date: '2026-02-25T10:00:00Z',
    url: 'https://www.coindesk.com/markets/2026-02-25/bitcoin-85k-institutional-inflow'
  },
  {
    id: 'mar-1',
    headline: 'March 2026: The Great AI Compute Shortage',
    summary: 'Global demand for AI chips outstrips supply by 3:1, leading to project delays across major tech hubs.',
    key_insights: ['Wait times for H200 chips reach 8 months', 'Sovereign AI clouds announced in EU', 'NVIDIA stock hits new records'],
    category: 'Tech',
    source: 'The Verge',
    sentiment: 'Neutral',
    confidence: 88,
    impact: "High",
    projection: "Companies with reserved compute capacity will outperform; others will face R&D delays.",
    topics: ['AI Chips', 'NVIDIA', 'Sovereign AI'],
    date: '2026-03-20T11:00:00Z',
    url: 'https://www.theverge.com/2026/3/20/ai-compute-shortage-crisis'
  },
  {
    id: 'mar-2',
    headline: 'Fed Holds Rates at 5.5% as Inflation Remains Sticky',
    summary: 'The Federal Reserve maintains its benchmark interest rate, citing persistent wage growth and high energy costs as barriers to cutting.',
    key_insights: ['Job market remains robust', 'Energy prices adding 0.5% to CPI', 'Rate cuts unlikely before Q4'],
    category: 'Economy',
    source: 'CNBC',
    sentiment: 'Neutral',
    confidence: 93,
    impact: "Medium",
    projection: "High-for-longer regime continues; focus on cash-rich companies with low debt.",
    topics: ['Federal Reserve', 'Inflation', 'Interest Rates'],
    date: '2026-03-28T15:00:00Z',
    url: 'https://www.cnbc.com/2026/03/28/fed-rate-decision-march-2026'
  }
];

export const HISTORICAL_TIMELINE_2026 = [
  { date: "Jan 2026", nifty: 26146, btc: 85400, event: "New Year Bullish Peak", sentiment: "Greed" },
  { date: "Feb 2026", nifty: 25200, btc: 72000, event: "Middle East Conflict Begins", sentiment: "Caution" },
  { date: "Mar 2026", nifty: 24800, btc: 66000, event: "Energy Crisis Blockade", sentiment: "Fear" },
  { date: "Apr 2026", nifty: 24200, btc: 70000, event: "Supply Chain Disruptions", sentiment: "Caution" },
  { date: "Apr 30, 2026", nifty: 23925, btc: 74012, event: "Oil Shock at $125/bbl", sentiment: "Fear" },
  { date: "May 1, 2026", nifty: 24150, btc: 75200, event: "Market Stabilization Attempt", sentiment: "Neutral" }
];

export const LIVE_INDICES = [
  { symbol: "S&P 500", value: "5,917.30", change: "+0.85%", up: true, volatility: [40, 45, 42, 48, 55, 52, 60] },
  { symbol: "NASDAQ", value: "18,915.20", change: "+1.12%", up: true, volatility: [30, 35, 32, 45, 40, 50, 58] },
  { symbol: "BTC", value: "$74,012", change: "+0.54%", up: true, volatility: [20, 50, 30, 70, 40, 80, 60] },
  { symbol: "NIFTY 50", value: "23,925", change: "-0.74%", up: false, volatility: [60, 58, 62, 55, 57, 50, 52] },
  { symbol: "CRUDE OIL", value: "$121.90", change: "+4.25%", up: true, volatility: [40, 42, 41, 44, 43, 45, 46] }
];

export const SECTOR_ANALYSIS = {
  Economy: "Strait of Hormuz tensions are the #1 credit risk for 2026. Global inflation remains steady at 3.1% but energy costs are a wildcard. Focus on Energy producers (Reliance/ONGC).",
  Tech: "AI is no longer augmenting—it's replacing. 20% of Q1 layoffs were AI-attributed. Focus on 'Sovereign AI' stocks like NVIDIA/Microsoft.",
  Crypto: "Bitcoin is acting as 'Digital Gold' today, holding $74k despite the stock market sell-off. Watch the $72k structural support level."
};
