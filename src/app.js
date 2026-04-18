import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste abaixo:
// app.get("/auth", (req, res) => {
//   res.send("AUTH OK");
// });

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

export default app;
