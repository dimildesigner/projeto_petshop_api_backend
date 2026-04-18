import express from "express";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.get("/auth", (req, res) => {
  res.send("AUTH OK");
});
app.use(express.json());
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

export default app;
