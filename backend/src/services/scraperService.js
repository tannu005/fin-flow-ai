const RSSParser = require('rss-parser');
const parser = new RSSParser();

const FINANCIAL_SOURCES = [
  { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
  { name: 'Reuters Business', url: 'http://feeds.reuters.com/reuters/businessNews' }
];

class ScraperService {
  constructor() {
    this.lastRun = 0;
    this.cooldownPeriod = 5 * 60 * 1000; // 5 minutes cooldown
    this.proxies = ['Proxy-A (Global)', 'Proxy-B (EU)', 'Proxy-C (APAC)'];
    this.currentProxyIndex = 0;
  }

  async fetchLatestNews() {
    const now = Date.now();
    if (now - this.lastRun < this.cooldownPeriod) {
      console.warn(`[SCRAPER] Cooldown active. Using rotated proxy: ${this.proxies[this.currentProxyIndex]}`);
      this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxies.length;
    }

    console.log(`[SCRAPER] Fetching news via ${this.proxies[this.currentProxyIndex]}...`);
    this.lastRun = now;

    const allArticles = [];

    for (const source of FINANCIAL_SOURCES) {
      try {
        const feed = await parser.parseURL(source.url);
        feed.items.forEach(item => {
          allArticles.push({
            headline: item.title,
            content: item.contentSnippet || item.content || item.title,
            url: item.link,
            source: source.name,
            date: item.pubDate
          });
        });
      } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error.message);
      }
    }

    return allArticles.slice(0, 10); // Limit for demo
  }
}

module.exports = new ScraperService();

