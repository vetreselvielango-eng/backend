import express from "express";
import {
  getAllOrders,
  getMyOrders,
  getOrderById,
  deleteOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ ADMIN / DASHBOARD – Get all orders
router.get("/", authMiddleware, getAllOrders);

// ✅ USER – Get logged-in user's orders
router.get("/my-orders", authMiddleware, getMyOrders);

// ✅ Get single order by ID
router.get("/:id", authMiddleware, getOrderById);

// ✅ Delete an order (optional – admin)
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
