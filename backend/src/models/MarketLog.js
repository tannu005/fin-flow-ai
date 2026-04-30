const mongoose = require('mongoose');

const MarketLogSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // Format: YYYY-MM-DD
  timestamp: { type: Date, default: Date.now },
  indices: [{
    symbol: String,
    value: String,
    change: String,
    up: Boolean,
    volatility: [Number]
  }],
  crypto: [{
    name: String,
    symbol: String,
    price: Number,
    change24h: Number,
    status: String
  }],
  insights: {
    vix: Number,
    aiComputeDemand: Number,
    fedMeetingCountdown: Number,
    fearGreedIndex: Number
  },
  sentimentScore: Number,
  metadata: {
    latency: String,
    dataSource: String,
    cacheStatus: String
  }
});

module.exports = mongoose.model('MarketLog', MarketLogSchema);
