const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Import all models to ensure they're registered with Mongoose
require('./models/User');
require('./models/Product');
require('./models/Order');
require('./models/Payment');
require('./models/Review');
require('./models/Vendor');

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Refil API is running');
});

const productsRouter = require('./routes/products');
const vendorsRouter = require('./routes/vendors');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const reviewsRouter = require('./routes/reviews');
const authRouter = require('./routes/auth');

app.use('/api/products', productsRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/refil', {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4 // Use IPv4, skip trying IPv6
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('\n🔧 Troubleshooting steps:');
  console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
  console.log('2. Verify your MONGO_URI in .env file');
  console.log('3. Ensure your MongoDB Atlas cluster is running');
  console.log('4. Try adding 0.0.0.0/0 to IP whitelist for development');
  process.exit(1);
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🔌 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
});
