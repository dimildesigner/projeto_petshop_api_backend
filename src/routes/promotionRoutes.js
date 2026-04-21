import express from "express";
import { getPromotions, updateDiscount } from "../controllers/promotionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware(), getPromotions);
router.patch("/:id/discount", authMiddleware(["admin"]), express.json(), updateDiscount);

export default router;
