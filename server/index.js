const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

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

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/refil', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
