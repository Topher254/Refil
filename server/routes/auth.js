const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Test route to verify auth router is working
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Auth router is working', 
    routes: ['/register', '/login', '/me', '/business-type'],
    timestamp: new Date().toISOString()
  });
});

// Test business-type route (without authentication for debugging)
router.get('/business-type-test', (req, res) => {
  res.json({ 
    message: 'Business-type route is accessible',
    method: 'GET',
    timestamp: new Date().toISOString()
  });
});

// List all registered routes for debugging
router.get('/routes', (req, res) => {
  const routes = [];
  router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods);
      routes.push({
        path: middleware.route.path,
        methods: methods
      });
    }
  });
  res.json({ 
    message: 'Available auth routes',
    routes: routes,
    total: routes.length
  });
});

// JWT Middleware to verify token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Ensure user object has _id field and include businessType
    const userObj = user.toObject();
    if (!userObj._id && userObj.id) {
      userObj._id = userObj.id;
    }
    
    // Don't set default businessType - let it be undefined if not set
    req.user = userObj;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();
    
    // Return the created user (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      businessType: user.businessType, // Don't set default - let user choose
      status: user.status
    };
    
    res.status(201).json({ 
      message: 'User registered successfully',
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      token, 
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        businessType: user.businessType, // Don't set default - let frontend handle it
        status: user.status 
      } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update business type (for vendors)
router.put('/business-type', authenticateToken, async (req, res) => {
  console.log('🔍 Business-type route hit!');
  try {
    const { businessType } = req.body;
    console.log('🔍 Request body:', req.body);
    console.log('🔍 User from token:', req.user);
    
    if (!businessType || !['gas', 'water', 'both'].includes(businessType)) {
      return res.status(400).json({ error: 'Invalid business type' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user._id, 
      { businessType }, 
      { new: true }
    ).select('-password');
    
    console.log('🔍 Updated user:', user);
    
    res.json({ 
      message: 'Business type updated successfully',
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        businessType: user.businessType || 'gas',
        status: user.status 
      } 
    });
  } catch (err) {
    console.error('🔍 Error in business-type route:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get current user (protected route)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Ensure user object has _id field
    const userObj = req.user;
    if (!userObj._id && userObj.id) {
      userObj._id = userObj.id;
    }
    
    // Include businessType in the response
    const userResponse = {
      _id: userObj._id,
      name: userObj.name,
      email: userObj.email,
      role: userObj.role,
      businessType: userObj.businessType, // Don't set default
      status: userObj.status
    };
    
    res.json({ user: userResponse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
