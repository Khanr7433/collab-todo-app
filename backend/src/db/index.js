import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("MongoDB connected successfully", conn.connection.host);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;
