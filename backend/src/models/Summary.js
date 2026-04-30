const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  headline: { type: String, required: true },
  summary: { type: String, required: true },
  key_insights: { type: [String], required: true },
  sentiment: { type: String, enum: ['Positive', 'Neutral', 'Negative'], required: true, default: 'Neutral' },
  topics: { type: [String], default: [] },
  category: { type: String, required: true },
  source: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Summary', summarySchema);
