# FIN-FLOW AI: Market Intelligence Pipeline 🚀

A high-end, production-ready pipeline that scrapes live financial news, processes it via LLMs (Gemini) for sentiment and topic extraction, and serves actionable intelligence through a cinematic 3D dashboard.

## 🌟 Key Upgrades & Features
- **Dashboard Layout**: Professional sidebar navigation, live ticker marquee, and dynamic search.
- **Advanced Analytics**: Real-time **Trending Topics Heatmap** and **Sentiment Analysis** (Positive/Neutral/Negative).
- **Recruiter-Ready Utilities**: 
  - **Export** intelligence to **PDF** and **CSV**.
  - **Bookmark** crucial insights (saved persistently via localStorage).
  - **Swagger API Docs**: Interactive OpenAPI specification available at `/api-docs`.
- **Cinematic UI Overhaul**: 
  - **Three.js** flowing data particle streams and glowing grids.
  - Custom **GSAP Trail Cursor** with particle burst effects.
  - 3D flip/expand transitions on summary cards.
  - Premium Typography: **Poppins** & **Inter**.
- **Live Scraper**: Real-world data ingestion from trusted RSS feeds (Yahoo Finance, Reuters) ensuring demos never break.
- **Resilient Pipeline**: Gemini LLM integration with `async-retry` logic and MongoDB caching.

## 🛠 Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, Swagger UI
- **AI**: Google Gemini Pro (`@google/generative-ai`)
- **Frontend**: React (Vite), Three.js, GSAP, jsPDF
- **Styling**: Vanilla CSS (Dark Obsidian Theme + Neon Accents)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)

### Installation
1. Clone the repository
2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm start
   ```
   *Visit `http://localhost:5000/api-docs` to view the Swagger API documentation.*

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📈 Demo Mode
The application is designed to be **100% Recruiter Ready**. If no MongoDB URI or Gemini API keys are provided in the `.env`, the system gracefully falls back to **Demo Mode**, utilizing a robust mock data system so the cinematic UI and analytics can be tested instantly without complex setup.
