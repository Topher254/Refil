const mongoose = require('mongoose');
require('dotenv').config();

// Test product data
const testProduct = {
  name: "ProGas 6kg Cylinder",
  brand: "ProGas",
  size: "6kg",
  basePrice: 1300,
  finalPrice: 1199,
  category: "Cooking Gas",
  image: "https://via.placeholder.com/300x300?text=ProGas+6kg",
  description: {
    line1: "High quality LPG gas",
    line2: "Safe for home use",
    line3: "Long lasting energy"
  },
  features: ["Free delivery", "24/7 support", "Safety guarantee"],
  specifications: {
    weight: "6kg",
    material: "Steel",
    pressure: "2.5 bar"
  },
  vendor: "507f1f77bcf86cd799439011" // Replace with actual vendor ID
};

async function testProductCreation() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    });
    
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a product
    const Product = require('./models/Product');
    
    console.log('🧪 Testing product creation...');
    const product = new Product(testProduct);
    await product.save();
    
    console.log('✅ Product created successfully!');
    console.log('📊 Product ID:', product._id);
    console.log('📊 Product Name:', product.name);
    console.log('📊 Product Rating:', product.rating);
    
    // Test fetching the product
    const fetchedProduct = await Product.findById(product._id).populate('vendor');
    console.log('✅ Product fetched successfully!');
    console.log('📊 Fetched Product:', fetchedProduct.name);
    
    // Clean up - delete test product
    await Product.findByIdAndDelete(product._id);
    console.log('🧹 Test product cleaned up');
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testProductCreation();
