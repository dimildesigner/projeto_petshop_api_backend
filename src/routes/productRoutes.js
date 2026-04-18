import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware(["admin"]), createProduct);
router.get("/", authMiddleware(), getProducts);
router.put("/:id", authMiddleware(["admin"]), updateProduct);
router.delete("/:id", authMiddleware(["admin"]), deleteProduct);

export default router;