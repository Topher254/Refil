const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String,
    city: String,
    additionalInfo: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    }
  ],
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  total: { type: Number, required: true },
  platformFee: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentMethod: { type: String, enum: ['mpesa', 'card', 'cash'], required: true },
  deliveryStatus: { type: String, enum: ['pending', 'processing', 'delivered', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
