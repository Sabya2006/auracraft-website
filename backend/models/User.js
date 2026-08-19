const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  channelName: { type: String, default: '' },
  avatarUrl: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' },
  bannerUrl: { type: String, default: '' },
  subscribersCount: { type: Number, default: 0 },
  subscribedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  niche: { type: String, default: 'General' },
  isCreator: { type: Boolean, default: false },
  collabMetrics: {
    totalCampaignsDone: { type: Number, default: 0 },
    avgEngagementRate: { type: Number, default: 0.0 },
    rating: { type: Number, default: 5.0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
