const express = require('express');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');

const router = express.Router();

// Get all vendors (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) filter.category = category;
    const vendors = await Vendor.find(filter).populate('products');
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('products');
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new vendor (admin only)
router.post('/', async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a vendor (admin or vendor)
router.put('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a vendor (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    // Optionally, delete all products for this vendor
    await Product.deleteMany({ vendor: vendor._id });
    res.json({ message: 'Vendor and their products deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
