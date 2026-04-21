import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import promotionRoutes from "./routes/promotionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://projeto-petshop-api-frontend.vercel.app",
  ],
  credentials: true,
}));

// ✅ express.json() global — antes de todas as rotas
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/stock", stockRoutes);
app.use("/promotions", promotionRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API Petshop rodando 🚀");
});

export default app;
