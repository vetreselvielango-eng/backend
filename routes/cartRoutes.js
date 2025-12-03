import express from "express";
import { addToCart, getCartByUser } from "../controllers/cartController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/", protect, addToCart);                 // Add to cart
router.get("/:userId", protect, getCartByUser);       // ✅ Get cart

export default router;
