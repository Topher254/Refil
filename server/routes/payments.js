const express = require('express');
const Payment = require('../models/Payment');
const Order = require('../models/Order');

const router = express.Router();

// Get all payments (admin)
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().populate('order');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payment by order
router.get('/order/:orderId', async (req, res) => {
  try {
    const payment = await Payment.findOne({ order: req.params.orderId }).populate('order');
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update payment status (admin/vendor/mpesa callback)
router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
