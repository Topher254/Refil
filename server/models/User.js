const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'vendor', 'admin'], default: 'customer' },
  businessType: { type: String, enum: ['gas', 'water', 'both'] }, // No default - user must choose
  status: { type: String, enum: ['active', 'pending', 'deactivated', 'blacklisted'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
