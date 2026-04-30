export const NEWS_CATEGORIES = ['Finance', 'Markets', 'Economy', 'Tech', 'Crypto'];

export const MOCK_ARTICLES = [
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
    date: new Date().toISOString()
  },
  {
    id: '2',
    headline: 'Central Banks Weigh Further Rate Hikes Amid Wage Growth',
    summary: 'Despite cooling headline inflation, persistent wage growth is keeping central bankers on alert, suggesting high rates might stay for longer.',
    key_insights: [
      'Labor market remain tight in major economies.',
      'Fed officials express caution over cutting rates too early.',
      'Bond yields fluctuate as investors reassess policy outlook.'
    ],
    category: 'Economy',
    source: 'Reuters',
    sentiment: 'Negative',
    topics: ['Interest Rates', 'Labor Market', 'Central Banks'],
    date: new Date().toISOString()
  }
];
