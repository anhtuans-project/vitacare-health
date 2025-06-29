import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from './models/userModel.js';

async function testRegistration() {
  try {
    console.log('Testing user registration...');
    
    // Check environment variables
    console.log('Environment variables:');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'Not defined');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Defined' : 'Not defined');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined');
      return;
    }
    
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not defined');
      return;
    }
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Test user data
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: '12345678'
    };
    
    // Check if user exists
    const exists = await userModel.findOne({ email: testUser.email });
    if (exists) {
      console.log('⚠️ User already exists, deleting...');
      await userModel.deleteOne({ email: testUser.email });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testUser.password, salt);
    
    // Create user
    const newUser = new userModel({
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword
    });
    
    const savedUser = await newUser.save();
    console.log('✅ User registered successfully:', savedUser.name);
    
    // Clean up
    await userModel.deleteOne({ email: testUser.email });
    console.log('✅ Test user cleaned up');
    
  } catch (error) {
    console.error('❌ Registration test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testRegistration(); 