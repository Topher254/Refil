const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.env.ADMIN_EMAIL ;
  const password = process.env.ADMIN_PASSWORD ;
  const name = 'Admin';
  const role = 'admin';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hashed = await bcrypt.hash(password, 10);
  const admin = new User({ name, email, password: hashed, role });
  await admin.save();
  console.log('Admin created:', email);
  process.exit(0);
}

createAdmin();
