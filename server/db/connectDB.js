import mongoose from "mongoose";

const connectDB = async (url) => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(url);
    console.log("Connect DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
