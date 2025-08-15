const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  vendorImage: { type: String },
  location: { type: String },
  deliveryTime: { type: String },
  deliveryRadius: { type: String },
  safetyCertification: { type: String },
  contact: { type: String },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Vendor', VendorSchema);
