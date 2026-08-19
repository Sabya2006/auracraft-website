const mongoose = require('mongoose');

const brandCampaignSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  brandLogo: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['Paid Sponsorship', 'Product Seeding', 'Barter'], default: 'Paid Sponsorship' },
  payoutRange: { type: String, required: true }, // e.g. "₹25,000 - ₹50,000" or "$500 - $1,000"
  targetNiche: [{ type: String }],
  minSubscribers: { type: Number, default: 1000 },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Closed', 'Filled'], default: 'Active' },
  applicationsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('BrandCampaign', brandCampaignSchema);
