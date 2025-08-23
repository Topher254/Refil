const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String, required: true },
  basePrice: { type: Number, required: true },
  offerPrice: { type: Number },
  finalPrice: { type: Number, required: true },
  image: { type: String, required: true }, // Required field for product image
  description: {
    line1: String,
    line2: String,
    line3: String,
  },
  features: [String],
  specifications: { type: Object },
  inStock: { type: Boolean, default: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Changed from 'Vendor' to 'User'
  businessType: { type: String, enum: ['gas', 'water', 'both'], required: true }, // Business type of the product
  category: { type: String, required: true },
  rating: { type: Number, default: 3, min: 1, max: 5 }, // Default 3 stars
  totalRatings: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  deliveryIncluded: { type: Boolean, default: false },
  deliveryFee: { type: Number, default: 0 },
  minimumOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
