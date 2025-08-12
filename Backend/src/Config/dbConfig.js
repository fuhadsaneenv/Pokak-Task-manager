import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection is successfull");
  } catch (error) {
    console.error("Database connection is failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
