import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Wrapper para capturar erros do multer
const uploadMiddleware = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("=== ERRO NO MULTER/CLOUDINARY ===", err.message);
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};

router.post("/", authMiddleware(["admin"]), uploadMiddleware, createProduct);
router.get("/", authMiddleware(), getProducts);
router.put("/:id", authMiddleware(["admin"]), uploadMiddleware, updateProduct); // ← multer adicionado aqui
router.delete("/:id", authMiddleware(["admin"]), deleteProduct);

export default router;
