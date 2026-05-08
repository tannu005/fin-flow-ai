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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
          Analyze the following financial news article and provide a structured JSON response.
          Article: ${article.content || article.headline}
          
          Required JSON fields:
          {
            "headline": "A concise headline",
            "summary": "A 2-3 sentence summary",
            "key_insights": ["Insight 1", "Insight 2"],
            "sentiment": "Positive" | "Neutral" | "Negative",
            "topics": ["topic1"],
            "category": "Markets",
            "projection": "Future outlook"
          }
          
          Return ONLY the JSON.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        
        // Improved JSON cleaning
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanJson);
      } catch (error) {
        console.error('LLM Attempt failed:', error.message);
        if (error.message.includes('404')) {
           console.warn('Model not found, falling back to mock for this article.');
           return { ...article, summary: "AI Analysis unavailable for this signal.", key_insights: ["System fallback active"], sentiment: "Neutral" };
        }
        throw error; 
      }
    }, {
      retries: 2,
      minTimeout: 500
    });
  }
}

module.exports = new LLMService();
