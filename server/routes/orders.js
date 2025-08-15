const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

const router = express.Router();

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product').populate('vendor');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product').populate('vendor');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders by vendor
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.params.vendorId }).populate('products.product').populate('vendor');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders by customer (userId)
router.get('/customer/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.user': req.params.userId }).populate('products.product').populate('vendor');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update order status (admin/vendor)
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
