import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/vi-notes";
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
