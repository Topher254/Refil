const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['mpesa', 'card', 'cash'], required: true },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  mpesaReceipt: { type: String },
  platformFee: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
