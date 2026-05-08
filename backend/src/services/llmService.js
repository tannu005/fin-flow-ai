const { GoogleGenerativeAI } = require("@google/generative-ai");
const retry = require('async-retry');
const dotenv = require('dotenv');
const { MOCK_ARTICLES } = require('../../../shared/constants');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key");

class LLMService {
  async summarize(article, isDemo = false) {
    if (isDemo || !process.env.GEMINI_API_KEY) {
      console.log('Demo mode or no API key: returning mock summary');
      return MOCK_ARTICLES[Math.floor(Math.random() * MOCK_ARTICLES.length)];
    }

    return await retry(async (bail) => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `
          Analyze the following financial news article and provide a structured JSON response.
          Article: ${article.content}
          
          Required JSON fields:
          {
            "headline": "A concise, catchy headline",
            "summary": "A 2-3 sentence summary of the news",
            "key_insights": ["Insight 1", "Insight 2", "Insight 3"],
            "sentiment": "One of: Positive, Neutral, Negative",
            "topics": ["topic1", "topic2", "topic3"],
            "category": "One of: Finance, Markets, Economy, Tech, Crypto"
          }
          
          Return ONLY the JSON.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean the response (sometimes LLMs wrap JSON in code blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Failed to parse JSON from LLM response');
        }
      } catch (error) {
        console.error('LLM Attempt failed:', error.message);
        if (error.status === 429) {
          throw error; // Retry on rate limit
        }
        bail(error); // Don't retry on other errors
      }
    }, {
      retries: 3,
      minTimeout: 1000,
      onRetry: (error, attempt) => {
        console.log(`Retrying LLM summarization (attempt ${attempt})...`);
      }
    });
  }
}

module.exports = new LLMService();
