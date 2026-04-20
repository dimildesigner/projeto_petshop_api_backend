import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://seu-frontend.vercel.app",
  ],
  credentials: true,
}));

// express.json() só em rotas que não fazem upload
app.use("/auth", express.json(), authRoutes);
app.use("/products", productRoutes); // ← sem express.json() aqui — o multer cuida do parsing

app.get("/", (req, res) => {
  res.send("API Petshop rodando 🚀");
});

export default app;