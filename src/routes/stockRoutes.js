import express from "express";
import {
  getStockProducts,
  registerMovement,
  getMovementsByProduct,
} from "../controllers/stockController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/products", authMiddleware(), getStockProducts);
router.post("/movement", authMiddleware(["admin"]), express.json(), registerMovement);
router.get("/history/:produtoId", authMiddleware(), getMovementsByProduct);

export default router;