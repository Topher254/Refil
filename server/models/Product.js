const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String, required: true },
  basePrice: { type: Number, required: true },
  offerPrice: { type: Number },
  finalPrice: { type: Number, required: true },
  image: { type: String },
  description: {
    line1: String,
    line2: String,
    line3: String,
  },
  features: [String],
  specifications: { type: Object },
  inStock: { type: Boolean, default: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
