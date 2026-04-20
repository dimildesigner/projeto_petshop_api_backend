import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware(["admin"]),
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("=== ERRO NO MULTER/CLOUDINARY ===");
        console.error("Mensagem:", err.message);
        console.error("Stack:", err.stack);
        return res.status(500).json({ error: err.message });
      }
      next();
    });
  },
  createProduct,
);

router.get("/", authMiddleware(), getProducts);
router.put("/:id", authMiddleware(["admin"]), updateProduct);
router.delete("/:id", authMiddleware(["admin"]), deleteProduct);

export default router;
