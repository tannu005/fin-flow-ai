const axios = require('axios');
const cheerio = require('cheerio');
const RSSParser = require('rss-parser');
const parser = new RSSParser();

const FINANCIAL_SOURCES = [
  { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
  { name: 'CNBC', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664' }
];

class ScraperService {
  async fetchLatestNews() {
    let allArticles = [];
    
    for (const source of FINANCIAL_SOURCES) {
      try {
        const feed = await parser.parseURL(source.url);
        // Take top 3 from each feed to process quickly
        const items = feed.items.slice(0, 3);
        
        for (const item of items) {
          try {
            const { data } = await axios.get(item.link, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
              },
              timeout: 10000
            });
            const $ = cheerio.load(data);
            
            let paragraphs = [];
            $('p').each((i, el) => {
              const text = $(el).text().trim();
              if (text.length > 50) {
                paragraphs.push(text);
              }
            });
            
            const content = paragraphs.slice(0, 5).join('\n\n') || item.contentSnippet || item.title;
            
            allArticles.push({
              headline: item.title,
              content: content.substring(0, 2000), // limit length
              url: item.link,
              source: source.name,
              date: item.pubDate || new Date().toISOString()
            });
          } catch (err) {
            allArticles.push({
              headline: item.title,
              content: item.contentSnippet || item.title,
              url: item.link,
              source: source.name,
              date: item.pubDate || new Date().toISOString()
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error.message);
      }
    }
    
    return allArticles;
  }
}

new ScraperService().fetchLatestNews().then(console.log);
