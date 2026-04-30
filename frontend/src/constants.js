export const MOCK_ARTICLES = [
  {
    id: 1,
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
    url: "https://bloomberg.com/oil-crisis-2026"
  },
  {
    id: 2,
    headline: "Nifty 50 Dips to 23,925; 8% Correction Since Jan Peak",
    summary: "The Indian benchmark index has broken critical support levels as foreign institutional investors pull out amid global risk-off sentiment. AI infrastructure stocks remain the only outliers.",
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
    url: "https://reuters.com/nifty-crash-2026"
  },
  {
    id: 3,
    headline: "Bitcoin Decouples from Equities, Holds $74,012",
    summary: "Despite the stock market sell-off, Bitcoin is acting as 'Digital Gold,' holding strong near $74k. Institutional ETF inflows recorded $2B in April alone.",
    key_insights: [
      "BTC institutional 'Stress Test' successful after 25% Jan dip.",
      "Massive decoupling from NASDAQ for the first time in 12 months.",
      "Stabilizing near $72k structural support."
    ],
    sentiment: "Positive",
    confidence: 88,
    impact: "Medium",
    projection: "Upside target remains $85k if geopolitical tensions persist as a hedge.",
    category: "Crypto",
    topics: ["Bitcoin", "Digital Gold", "ETFs"],
    source: "Financial Times",
    date: "2026-04-30T16:45:00Z",
    url: "https://ft.com/crypto-resilience-2026"
  },
  {
    id: 4,
    headline: "AI Workforce Restructuring: 45k Layoffs in Q1 2026",
    summary: "Major tech firms are prioritizing 'Sovereign AI' infrastructure over human workforce, leading to significant layoffs even as compute demand hits new records.",
    key_insights: [
      "20% of Q1 layoffs directly attributed to AI automation.",
      "AI Compute Demand hits 92% capacity globally.",
      "Focus shifting to decentralized AI protocols."
    ],
    sentiment: "Neutral",
    confidence: 90,
    impact: "Medium",
    projection: "AI is no longer augmenting—it's replacing. Focus on 'Sovereign AI' stocks like NVIDIA and Microsoft.",
    category: "Tech",
    topics: ["AI Layoffs", "Compute Demand", "Sovereign AI"],
    source: "CNBC",
    date: "2026-04-30T16:45:00Z",
    url: "https://cnbc.com/ai-layoffs-2026"
  },
  {
    id: 5,
    headline: "Global Credit Loss Estimate Hits $180B Due to Middle East Conflict",
    summary: "Financial institutions are bracing for massive credit losses as regional instability impacts global trade and banking channels.",
    key_insights: [
      "Shipping costs increased by 300% on key routes.",
      "Insurance premiums for freight in the Red Sea at all-time highs.",
      "Banking risk models adjusted for prolonged disruption."
    ],
    sentiment: "Negative",
    confidence: 94,
    impact: "Critical",
    projection: "Expect banking sector volatility to remain high until de-escalation occurs.",
    category: "Economy",
    topics: ["Credit Loss", "Banking", "Trade"],
    source: "Bloomberg",
    date: "2026-04-30T10:00:00Z",
    url: "https://bloomberg.com/credit-losses-2026"
  },
  {
    id: 6,
    headline: "Ethereum L3 Scaling Solutions Reach Mass Adoption",
    summary: "Layer 3 networks are now processing over 100k transactions per second, making decentralized finance accessible for micro-payments.",
    key_insights: [
      "Gas fees reduced to near-zero for L3 users.",
      "Interoperability protocols bridge $50B in assets.",
      "Institutional adoption of private L3s for settlement."
    ],
    sentiment: "Positive",
    confidence: 91,
    impact: "Medium",
    projection: "Ethereum's ecosystem value expected to double as micro-transactions unlock new business models.",
    category: "Crypto",
    topics: ["Ethereum", "L3", "Scaling"],
    source: "CoinDesk",
    date: "2026-04-30T11:00:00Z",
    url: "https://coindesk.com/eth-scaling-2026"
  },
  {
    id: 7,
    headline: "Sovereign AI: Nations Building Independent Compute Clouds",
    summary: "France, India, and Japan have announced independent AI compute clouds to reduce reliance on US-based hyperscalers.",
    key_insights: [
      "Total investment exceeding $120B globally.",
      "Local language models (LLMs) prioritized for security.",
      "Data sovereignty laws driving infrastructure shifts."
    ],
    sentiment: "Neutral",
    confidence: 89,
    impact: "High",
    projection: "Independent clouds will create a fragmented but more resilient global AI infrastructure.",
    category: "Tech",
    topics: ["Sovereign AI", "Compute Clouds", "Infrastructure"],
    source: "Wired",
    date: "2026-04-30T12:00:00Z",
    url: "https://wired.com/sovereign-ai-2026"
  }
];

export const HISTORICAL_TIMELINE_2026 = [
  { date: "Jan 2026", nifty: 26146, btc: 85400, event: "New Year Bullish Peak", sentiment: "Greed" },
  { date: "Feb 2026", nifty: 25200, btc: 72000, event: "Middle East Conflict Begins", sentiment: "Caution" },
  { date: "Mar 2026", nifty: 24800, btc: 66000, event: "Energy Crisis Blockade", sentiment: "Fear" },
  { date: "Apr 30, 2026", nifty: 23925, btc: 74012, event: "Oil Shock at $125/bbl", sentiment: "Fear" }
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
