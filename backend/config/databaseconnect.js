// backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://raviranjankumar8595:ranjan8595@cluster0.fbosfb3.mongodb.net/todo');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

export default connectDB;
