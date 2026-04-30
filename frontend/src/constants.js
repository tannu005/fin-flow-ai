export const MOCK_ARTICLES = [
  {
    id: 'apr-30-1',
    headline: "Strait of Hormuz Blockade Triggers Energy Supply Shock",
    summary: "Geopolitical fragmentation reaches a new peak as the Strait of Hormuz remains blocked, disrupting 20% of global oil flow. Markets are pricing in a prolonged regionalization of energy trade.",
    key_insights: [
      "10 million barrels/day supply shock identified.",
      "Global inflation forecast revised to 5.8% as regionalization costs rise.",
      "Defensive sectors showing strength as fiscal sustainability concerns grow."
    ],
    sentiment: "Negative",
    confidence: 96,
    impact: "High",
    projection: "Energy costs to tax corporate margins through Q3; expect shift toward local energy production and lithium/copper securing.",
    category: "Economy",
    topics: ["Geopolitics", "Energy Transition", "Regionalization"],
    source: "Bloomberg",
    date: "2026-04-30T16:45:00Z",
    url: "https://www.google.com/search?q=Strait+of+Hormuz+Blockade+2026+energy+shock"
  },
  {
    id: 'crypto-inst-1',
    headline: "Institutional Era Dawn: BlackRock Tokenizes $50B in RWAs",
    summary: "Real-World Asset (RWA) tokenization moves from pilot to mainstream as BlackRock announces the full integration of its private equity funds on-chain.",
    key_insights: [
      "24/7 liquidity unlocked for previously illiquid assets.",
      "US legislation 'CLARITY Act' provides stablecoin regulatory shield.",
      "Tokenized treasury systems becoming standard for B2B settlements."
    ],
    sentiment: "Positive",
    confidence: 94,
    impact: "Critical",
    projection: "Institutional integration will drive BTC toward $100k despite retail volatility; focus on RWA protocols.",
    category: "Crypto",
    topics: ["RWA", "Institutional", "Tokenization"],
    source: "Financial Times",
    date: "2026-04-30T10:00:00Z",
    url: "https://www.google.com/search?q=BlackRock+RWA+tokenization+institutional+crypto"
  },
  {
    id: 'tech-ai-1',
    headline: "AI Capex Shifts to Operational Productivity Gains",
    summary: "NVIDIA reports that AI investment has shifted from speculative infrastructure build-out to operational spending focused on tangible productivity gains.",
    key_insights: [
      "Fortune 500 firms reporting 15% efficiency gain from AI agents.",
      "Sovereign AI clouds in EU and India reaching full capacity.",
      "AI x Crypto payment standards (x402) enabling autonomous agent trade."
    ],
    sentiment: "Positive",
    confidence: 92,
    impact: "High",
    projection: "The 'Fat App' thesis is playing out; value is shifting from chips to specialized user-facing AI applications.",
    category: "Tech",
    topics: ["AI Agents", "Productivity", "Sovereign AI"],
    source: "Wired",
    date: "2026-04-30T12:00:00Z",
    url: "https://www.google.com/search?q=AI+Capex+Operational+Productivity+2026"
  },
  {
    id: 'crypto-ai-1',
    headline: "Autonomous AI Agents Adopt Crypto for Cross-Border Settlement",
    summary: "A new era of 'Machine-to-Machine' finance emerges as autonomous AI agents begin using stablecoins for server-side resource settlement.",
    key_insights: [
      "Identity standard x402 enables agent-level cryptographic signatures.",
      "Stablecoins cited as the 'Internet's Dollar' for AI trade.",
      "DeFi protocols seeing 40% volume from non-human actors."
    ],
    sentiment: "Positive",
    confidence: 89,
    impact: "Medium",
    projection: "The intersection of AI and Crypto will create a self-sustaining economy independent of retail sentiment.",
    category: "Crypto",
    topics: ["AI x Crypto", "Stablecoins", "Autonomous Finance"],
    source: "CoinDesk",
    date: "2026-04-29T14:00:00Z",
    url: "https://www.google.com/search?q=AI+agents+stablecoins+x402+settlement"
  },
  {
    id: 'eco-frag-1',
    headline: "Global Trade Fragmentation: The Death of Globalism?",
    summary: "2026 marks the definitive shift toward regional trade blocs, with the US, EU, and BRICS+ formalizing independent fiscal and trade policies.",
    key_insights: [
      "Sovereign debt levels hit new highs globally.",
      "Supply chains regionalizing to avoid geopolitical risk.",
      "Fiscal sustainability is the primary concern for bond markets."
    ],
    sentiment: "Neutral",
    confidence: 87,
    impact: "Critical",
    projection: "Expect a 'New Normal' growth of 3%; US outperformance to continue despite fragmentation.",
    category: "Economy",
    topics: ["Fragmentation", "Sovereign Debt", "Trade Blocs"],
    source: "The Economist",
    date: "2026-04-28T09:00:00Z",
    url: "https://www.google.com/search?q=Global+Trade+Fragmentation+2026+regional+blocs"
  }
];

export const HISTORICAL_TIMELINE_2026 = [
  { date: "Jan 2026", nifty: 26146, btc: 85400, event: "New Year Bullish Peak", sentiment: "Greed" },
  { date: "Feb 2026", nifty: 25200, btc: 72000, event: "Middle East Conflict Begins", sentiment: "Caution" },
  { date: "Mar 2026", nifty: 24800, btc: 66000, event: "Energy Crisis Blockade", sentiment: "Fear" },
  { date: "Apr 2026", nifty: 24200, btc: 75000, event: "Supply Chain Disruptions", sentiment: "Caution" },
  { date: "Apr 30, 2026", nifty: 23925, btc: 77012, event: "Oil Shock at $125/bbl", sentiment: "Fear" },
  { date: "May 1, 2026", nifty: 24150, btc: 78200, event: "Market Stabilization Attempt", sentiment: "Neutral" }
];

export const LIVE_INDICES = [
  { symbol: "S&P 500", value: "5,917.30", change: "+0.85%", up: true, volatility: [40, 45, 42, 48, 55, 52, 60] },
  { symbol: "NASDAQ", value: "18,915.20", change: "+1.12%", up: true, volatility: [30, 35, 32, 45, 40, 50, 58] },
  { symbol: "BTC", value: "$77,012", change: "+0.54%", up: true, volatility: [20, 50, 30, 70, 40, 80, 60] },
  { symbol: "GOLD", value: "$4,512.50", change: "+1.24%", up: true, volatility: [10, 15, 12, 18, 20, 22, 25] },
  { symbol: "NIFTY 50", value: "23,925", change: "-0.74%", up: false, volatility: [60, 58, 62, 55, 57, 50, 52] },
  { symbol: "CRUDE OIL", value: "$121.90", change: "+4.25%", up: true, volatility: [40, 42, 41, 44, 43, 45, 46] }
];

export const RECRUITER_DATA = {
  talentDemand: [
    { sector: 'AI Engineering', demand: 'Extreme', hiring: 85, layoffs: 5 },
    { sector: 'Blockchain', demand: 'High', hiring: 45, layoffs: 12 },
    { sector: 'Cybersecurity', demand: 'Stable', hiring: 30, layoffs: 2 },
    { sector: 'Traditional Fin', demand: 'Declining', hiring: 10, layoffs: 45 }
  ],
  topHiringFirms: ['SovereignAI India', 'Ethos Labs', 'Nexus compute', 'Bharat Tech'],
  layoffHeatmap: {
    Tech: 12500,
    Finance: 8400,
    Crypto: 1200,
    Retail: 4500
  }
};

export const SECTOR_ANALYSIS = {
  Economy: "2026 is defined by 'Structural Fragmentation'. Regionalization is the new globalism as trade blocs solidify. High sovereign debt and tight commodity markets (Copper, Lithium) are the primary fiscal risks. Focus on regional energy independence.",
  Tech: "We are moving from AI Hype to 'Operational Productivity'. Investment is shifting from chips (Capex) to user-facing applications (Opex). Sovereign AI clouds are mandatory for national security. Focus on the 'Fat App' thesis.",
  Crypto: "The Institutional Era has arrived. RWA tokenization (Stocks, Bonds) is now standard financial infrastructure. AI agents are transacting autonomously using stablecoins via cryptographic identity standards like x402. Focus on institutional-grade protocols."
};
