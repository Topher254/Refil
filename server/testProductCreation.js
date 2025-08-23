const mongoose = require('mongoose');
require('dotenv').config();

async function testProductCreation() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    });
    
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a product with User as vendor
    const Product = require('./models/Product');
    const User = require('./models/User');
    
    // First, let's check if there are any users with vendor role
    const vendorUsers = await User.find({ role: 'vendor' });
    console.log('📊 Found vendor users:', vendorUsers.length);
    
    if (vendorUsers.length === 0) {
      console.log('❌ No vendor users found. Please create a vendor user first.');
      await mongoose.connection.close();
      return;
    }
    
    const vendorUser = vendorUsers[0];
    console.log('✅ Using vendor user:', vendorUser.name, 'with ID:', vendorUser._id);
    
    // Test product data
    const testProduct = {
      name: "Test ProGas 6kg",
      brand: "ProGas",
      size: "6kg",
      basePrice: 1300,
      finalPrice: 1199,
      category: "Cooking Gas",
      image: "https://via.placeholder.com/300x300?text=Test+Product",
      description: {
        line1: "Test product for development",
        line2: "Safe for testing",
        line3: "Development use only"
      },
      features: ["Test feature 1", "Test feature 2"],
      specifications: {
        weight: "6kg",
        material: "Test"
      },
      vendor: vendorUser._id
    };
    
    console.log('🧪 Testing product creation...');
    const product = new Product(testProduct);
    await product.save();
    
    console.log('✅ Product created successfully!');
    console.log('📊 Product ID:', product._id);
    console.log('📊 Product Name:', product.name);
    console.log('📊 Product Vendor:', product.vendor);
    console.log('📊 Product Rating:', product.rating);
    
    // Test fetching the product with populated vendor
    const fetchedProduct = await Product.findById(product._id).populate('vendor', 'name email role');
    console.log('✅ Product fetched successfully!');
    console.log('📊 Fetched Product Name:', fetchedProduct.name);
    console.log('📊 Fetched Product Vendor:', fetchedProduct.vendor);
    
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
