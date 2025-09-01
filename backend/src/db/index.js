import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // MongoDB connected successfully
  } catch (err) {
    // MongoDB connection failed
    process.exit(1);
  }
};

export default connectDB;
