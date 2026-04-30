const RSSParser = require('rss-parser');
const parser = new RSSParser();

const FINANCIAL_SOURCES = [
  { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
  { name: 'Reuters Business', url: 'http://feeds.reuters.com/reuters/businessNews' }
];

class ScraperService {
  async fetchLatestNews() {
    console.log('Fetching latest news from RSS feeds...');
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
