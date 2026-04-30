const puppeteer = require('puppeteer');
const NewsAPI = require('newsapi');
const RSSParser = require('rss-parser');
const parser = new RSSParser();

const FINANCIAL_SOURCES = [
  { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
  { name: 'Reuters Business', url: 'http://feeds.reuters.com/reuters/businessNews' }
];

class ScraperService {
  constructor() {
    this.newsapi = process.env.NEWS_API_KEY ? new NewsAPI(process.env.NEWS_API_KEY) : null;
  }

  async fetchLatestNews() {
    let articles = [];

    // 1. Try Puppeteer for high-fidelity scraping (e.g., Bloomberg/CNBC)
    try {
      articles = await this.scrapeWithPuppeteer();
      if (articles.length > 0) return articles;
    } catch (e) {
      console.warn("[SCRAPER] Puppeteer failed, trying NewsAPI...", e.message);
    }

    // 2. Fallback to NewsAPI
    if (this.newsapi) {
      try {
        const response = await this.newsapi.v2.topHeadlines({
          category: 'business',
          language: 'en',
          country: 'us'
        });
        articles = response.articles.map(a => ({
          headline: a.title,
          content: a.description || a.content || a.title,
          url: a.url,
          source: a.source.name,
          date: a.publishedAt
        }));
        if (articles.length > 0) return articles;
      } catch (e) {
        console.warn("[SCRAPER] NewsAPI failed, falling back to RSS.");
      }
    }

    // 3. Last Resort: RSS
    return await this.fetchFromRSS();
  }

  async scrapeWithPuppeteer() {
    // Only attempt if we are not in a restricted environment
    const browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    try {
      await page.goto('https://www.reuters.com/business/', { waitUntil: 'networkidle2', timeout: 30000 });
      const scraped = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('li[data-testid="item"]')).slice(0, 5);
        return items.map(i => ({
          headline: i.querySelector('h3')?.innerText,
          url: i.querySelector('a')?.href,
          source: 'Reuters (Live)',
          date: new Date().toISOString()
        }));
      });
      return scraped.filter(s => s.headline && s.url);
    } finally {
      await browser.close();
    }
  }

  async fetchFromRSS() {
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
    return allArticles.slice(0, 10);
  }
}

module.exports = new ScraperService();
