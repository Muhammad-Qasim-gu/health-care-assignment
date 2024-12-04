import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.CONNECTION || "mongodb+srv://qasim:qasim786@care-track-cluster.791cq.mongodb.net/qasim?retryWrites=true&w=majority&appName=care-track-cluster");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}


