const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Testing MongoDB Connection...\n');

// Test 1: Check environment variable
console.log('1️⃣ Checking MONGODB_URI...');
if (process.env.MONGODB_URI) {
  console.log('✅ MONGODB_URI is set');
  // Hide password in output
  const uriDisplay = process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@');
  console.log('   URI:', uriDisplay);
} else {
  console.log('❌ MONGODB_URI is not set');
  process.exit(1);
}

// Test 2: Try to connect
console.log('\n2️⃣ Attempting to connect to MongoDB...');
console.log('   (This may take up to 30 seconds)');

const options = {
  dbName: "sourav-portfolio",
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 75000,
  family: 4,
  retryWrites: true,
  w: 'majority'
};

mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('   Database:', mongoose.connection.db.databaseName);
    console.log('   Host:', mongoose.connection.host);
    
    // Test 3: Try to list collections
    console.log('\n3️⃣ Listing collections...');
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    console.log('✅ Collections found:', collections.length);
    collections.forEach(col => {
      console.log('   -', col.name);
    });
    
    console.log('\n✅ All tests passed! MongoDB connection is working.');
    process.exit(0);
  })
  .catch((error) => {
    console.log('\n❌ MongoDB Connection Failed!');
    console.log('   Error:', error.message);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
      console.log('\n💡 DNS Resolution Error:');
      console.log('   - Your network may be blocking MongoDB DNS lookups');
      console.log('   - Try using a VPN or different network');
      console.log('   - Check your firewall settings');
    } else if (error.message.includes('timed out')) {
      console.log('\n💡 Connection Timeout:');
      console.log('   - Your IP address may not be whitelisted in MongoDB Atlas');
      console.log('   - Go to: https://cloud.mongodb.com');
      console.log('   - Navigate to: Network Access');
      console.log('   - Add your IP or use 0.0.0.0/0 for testing');
    } else if (error.message.includes('authentication')) {
      console.log('\n💡 Authentication Error:');
      console.log('   - Check your username and password');
      console.log('   - Verify database user permissions');
    }
    
    process.exit(1);
  });
