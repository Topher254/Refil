const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Testing MongoDB connection...');
console.log('📡 MONGO_URI:', process.env.MONGO_URI ? 'Set (hidden for security)' : 'NOT SET');

async function testConnection() {
  try {
    console.log('🔄 Attempting to connect...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🔌 Connection state:', mongoose.connection.readyState);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Collections found:', collections.length);
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed successfully');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('IP whitelist')) {
      console.log('\n🔧 SOLUTION: Add your IP to MongoDB Atlas whitelist');
      console.log('1. Go to MongoDB Atlas > Network Access');
      console.log('2. Click "Add IP Address"');
      console.log('3. Add your current IP or use 0.0.0.0/0 for development');
    }
    
    if (error.message.includes('authentication failed')) {
      console.log('\n🔧 SOLUTION: Check your username/password in MONGO_URI');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 SOLUTION: Check your cluster URL in MONGO_URI');
    }
    
    process.exit(1);
  }
}

testConnection();
