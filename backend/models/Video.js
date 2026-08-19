const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  category: { type: String, default: 'Entertainment' },
  tags: [{ type: String }],
  
  // Next-Gen Feature: Hyper-Local Auto-Dubbing Track References
  audioDubbedTracks: [{
    language: { type: String, required: true }, // e.g. 'hi', 'ta', 'te', 'es', 'mr'
    audioUrl: { type: String, required: true },
    isAiGenerated: { type: Boolean, default: true }
  }],

  // Next-Gen Feature: Transparent Algorithm Breakdown Metrics
  algorithmMetrics: {
    clickThroughRate: { type: Number, default: 0.0 }, // percentage
    avgWatchPercentage: { type: Number, default: 0.0 },
    retentionScore: { type: Number, default: 0.0 }, // 0 to 100
    pushScore: { type: Number, default: 50 }, // 0 to 100 algorithm recommendation index
    recommendationReason: { type: String, default: 'Fresh release in subscriber feeds' },
    improvementTips: [{ type: String }]
  },

  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
