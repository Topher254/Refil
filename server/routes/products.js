const express = require('express');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

const router = express.Router();

// Get all products (optionally filter by category or vendor)
router.get('/', async (req, res) => {
  try {
    const { category, vendor } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (vendor) filter.vendor = vendor;
    const products = await Product.find(filter).populate('vendor');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('vendor');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product (vendor only)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    // Add product to vendor's products array
    await Vendor.findByIdAndUpdate(product.vendor, { $push: { products: product._id } });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a product (vendor only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product (vendor only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    // Remove product from vendor's products array
    await Vendor.findByIdAndUpdate(product.vendor, { $pull: { products: product._id } });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
