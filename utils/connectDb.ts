import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const mongoUrl = process.env.DB_URL as string;

  if (!mongoUrl) {
    throw new Error("[ENV ERROR]: env variable not found.");
  }

  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.error("[DB_ERROR]: ", error);
  }
};

export default connectDb;
