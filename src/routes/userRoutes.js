import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",        authMiddleware(["admin"]), getUsers);
router.post("/",       authMiddleware(["admin"]), createUser);
router.put("/:id",     authMiddleware(["admin"]), updateUser);
router.delete("/:id",  authMiddleware(["admin"]), deleteUser);

export default router;
