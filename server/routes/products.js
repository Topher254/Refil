const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User'); // Changed from Vendor to User

const router = express.Router();

// Get all products (optionally filter by category or vendor)
router.get('/', async (req, res) => {
  try {
    const { category, vendor } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (vendor) filter.vendor = vendor;
    const products = await Product.find(filter).populate('vendor', 'name email role'); // Populate with User data
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('vendor', 'name email role'); // Populate with User data
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product (vendor only)
router.post('/', async (req, res) => {
  try {
    const { name, brand, size, basePrice, finalPrice, category, image, description, features, specifications } = req.body;
    
    // Validate required fields
    if (!name || !brand || !size || !basePrice || !finalPrice || !category || !image || !req.body.vendor) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify the vendor exists and is actually a vendor
    const vendorUser = await User.findById(req.body.vendor);
    if (!vendorUser || vendorUser.role !== 'vendor') {
      return res.status(400).json({ error: 'Invalid vendor' });
    }

    // Create product with default values
    const productData = {
      name,
      brand,
      size,
      basePrice: Number(basePrice),
      finalPrice: Number(finalPrice),
      category,
      image,
      vendor: req.body.vendor,
      businessType: vendorUser.businessType || 'gas', // Set business type from vendor
      rating: 3, // Default 3 stars
      totalRatings: 0,
      inStock: true,
      deliveryIncluded: false,
      deliveryFee: 0,
      minimumOrder: 0
    };

    // Add optional fields if provided
    if (description) productData.description = description;
    if (features) productData.features = features;
    if (specifications) productData.specifications = specifications;

    const product = new Product(productData);
    await product.save();
    
    // Populate vendor info before sending response
    const populatedProduct = await Product.findById(product._id).populate('vendor', 'name email role');
    res.status(201).json(populatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a product (vendor only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('vendor', 'name email role');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product (vendor only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    // Delete the product
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
