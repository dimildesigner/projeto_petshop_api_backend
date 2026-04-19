import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://seu-frontend.vercel.app", // adicionar depois do deploy
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Petshop rodando 🚀");
});

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

export default app;
