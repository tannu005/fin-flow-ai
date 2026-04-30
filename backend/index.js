const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const Summary = require('./src/models/Summary');
const scraperService = require('./src/services/scraperService');
const llmService = require('./src/services/llmService');
const { MOCK_ARTICLES } = require('../shared/constants');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FIN-FLOW AI API',
      version: '1.0.0',
      description: 'API for scraping, summarizing, and analyzing financial news',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ['./index.js'], // Document endpoints in this file
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('No MONGODB_URI provided. Running in memory/mock mode.');
}

/**
 * @swagger
 * /api/summaries:
 *   get:
 *     summary: Retrieve a list of news summaries
 *     responses:
 *       200:
 *         description: A list of summaries.
 */
app.get('/api/summaries', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.json(MOCK_ARTICLES);
    }
    const summaries = await Summary.find().sort({ date: -1 });
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/scrape:
 *   post:
 *     summary: Trigger a new scrape and summarization process
 *     responses:
 *       200:
 *         description: Scrape completed successfully.
 */
app.post('/api/scrape', async (req, res) => {
  try {
    const articles = await scraperService.fetchLatestNews();
    const results = [];

    for (const article of articles) {
      if (process.env.MONGODB_URI) {
        const existing = await Summary.findOne({ url: article.url });
        if (existing) continue;
      }

      const summaryData = await llmService.summarize(article, !process.env.GEMINI_API_KEY);
      
      const newSummary = new Summary({
        ...summaryData,
        url: article.url,
        source: article.source,
        date: article.date ? new Date(article.date) : new Date()
      });

      if (process.env.MONGODB_URI) {
        await newSummary.save();
      }
      results.push(newSummary);
    }

    res.json({ message: 'Scrape completed', count: results.length, data: results });
  } catch (error) {
    console.error('Scrape error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/heatmap:
 *   get:
 *     summary: Get trending topics and sentiment aggregation
 *     responses:
 *       200:
 *         description: Heatmap data.
 */
app.get('/api/heatmap', async (req, res) => {
  try {
    let summaries = [];
    if (!process.env.MONGODB_URI) {
      summaries = MOCK_ARTICLES;
    } else {
      summaries = await Summary.find();
    }
    
    const topicCounts = {};
    const sentimentCounts = { Positive: 0, Neutral: 0, Negative: 0 };
    
    summaries.forEach(s => {
      if (s.sentiment && sentimentCounts[s.sentiment] !== undefined) {
        sentimentCounts[s.sentiment]++;
      }
      if (s.topics && Array.isArray(s.topics)) {
        s.topics.forEach(topic => {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });
      }
    });

    const trendingTopics = Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({ trendingTopics, sentimentCounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const marketDataService = require('./src/services/marketDataService');

// ... existing code ...

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check system health and API status
 *     responses:
 *       200:
 *         description: System status and uptime.
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    api_layers: {
      mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      llm: process.env.GEMINI_API_KEY ? 'Active' : 'Fallback'
    }
  });
});

/**
 * @swagger
 * /api/market-pulse:
 *   get:
 *     summary: Get real-time market indices, crypto, and sentiment
 *     responses:
 *       200:
 *         description: Live market data.
 */
const { getDailyPulse, getHistory } = require('./src/services/marketDataService');

/**
 * @swagger
 * /api/market-pulse:
 *   get:
 *     summary: Get daily persistent market data (Check-or-Fetch logic)
 *     responses:
 *       200:
 *         description: Daily market pulse.
 */
app.get('/api/market-pulse', async (req, res) => {
  try {
    const data = await getDailyPulse();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/market-history:
 *   get:
 *     summary: Get historical market logs for trend analysis
 *     responses:
 *       200:
 *         description: List of previous daily logs.
 */
app.get('/api/market-history', async (req, res) => {
  try {
    const history = await getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
