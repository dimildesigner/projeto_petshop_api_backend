import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGO_URI); // 👈 teste

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas conectado 🚀");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
};