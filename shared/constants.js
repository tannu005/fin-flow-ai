const NEWS_CATEGORIES = ['Finance', 'Markets', 'Economy', 'Tech', 'Crypto'];

const MOCK_ARTICLES = [
  {
    id: '1',
    headline: 'Global Markets Rally on Inflation Cooling Signs',
    summary: 'Stock indices across the US and Europe saw significant gains today as new data suggests inflation might be easing faster than anticipated.',
    key_insights: [
      'S&P 500 rose by 1.5% in early trading.',
      'European Central Bank hints at potential rate pause.',
      'Tech sector leads the rally with major gains in AI-related stocks.'
    ],
    category: 'Markets',
    source: 'Financial Times',
    sentiment: 'Positive',
    topics: ['Inflation', 'Stock Market', 'AI'],
    date: '2026-04-30T10:00:00Z',
    url: 'https://ft.com/markets-rally-2026'
  },
  {
    id: '2',
    headline: 'Central Banks Weigh Further Rate Hikes Amid Wage Growth',
    summary: 'Despite cooling headline inflation, persistent wage growth is keeping central bankers on alert, suggesting high rates might stay for longer.',
    key_insights: [
      'Labor market remains tight in major economies.',
      'Fed officials express caution over cutting rates too early.',
      'Bond yields fluctuate as investors reassess policy outlook.'
    ],
    category: 'Economy',
    source: 'Reuters',
    sentiment: 'Negative',
    topics: ['Interest Rates', 'Labor Market', 'Central Banks'],
    date: '2026-04-30T12:00:00Z',
    url: 'https://reuters.com/economy-rates-2026'
  },
  {
    id: 'jan-1',
    headline: 'January 2026: Nifty Hits All-Time High of 26,000',
    summary: 'The new year starts with a massive rally as foreign investment pours into the Indian tech and green energy sectors.',
    key_insights: ['FII inflows hit $5B in first week', 'Green energy index up 12%', 'Tech valuations reach new peaks'],
    category: 'Markets',
    source: 'Mint',
    sentiment: 'Positive',
    topics: ['New Year Rally', 'Nifty', 'FII'],
    date: '2026-01-15T09:00:00Z',
    url: 'https://livemint.com/nifty-jan-2026'
  },
  {
    id: 'feb-1',
    headline: 'February 2026: Geopolitical Tensions Spark Energy Concerns',
    summary: 'As tensions rise in the Middle East, oil prices begin their upward climb, putting pressure on global shipping and logistics.',
    key_insights: ['Brent crude crosses $90/bbl', 'Shipping routes redirected', 'Inflation fears resurface'],
    category: 'Economy',
    source: 'Bloomberg',
    sentiment: 'Negative',
    topics: ['Oil', 'Geopolitics', 'Energy'],
    date: '2026-02-10T14:00:00Z',
    url: 'https://bloomberg.com/energy-feb-2026'
  },
  {
    id: 'mar-1',
    headline: 'March 2026: The Great AI Compute Shortage',
    summary: 'Global demand for AI chips outstrips supply by 3:1, leading to project delays across major tech hubs.',
    key_insights: ['Wait times for H200 chips reach 8 months', 'Sovereign AI clouds announced in EU', 'NVIDIA stock hits new records'],
    category: 'Tech',
    source: 'The Verge',
    sentiment: 'Neutral',
    topics: ['AI Chips', 'NVIDIA', 'Sovereign AI'],
    date: '2026-03-20T11:00:00Z',
    url: 'https://theverge.com/ai-shortage-2026'
  }
];

module.exports = { NEWS_CATEGORIES, MOCK_ARTICLES };
