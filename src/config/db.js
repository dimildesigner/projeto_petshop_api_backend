import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas conectado 🚀");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
};