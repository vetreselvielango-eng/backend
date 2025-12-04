import express from "express";
import {
  createCheckoutSession,
  verifyCheckoutSession,
} from "../controllers/paymentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/checkout/create-session
router.post("/create-session", authMiddleware, createCheckoutSession);

// GET /api/checkout/verify-session?session_id=xxx
router.get("/verify-session", authMiddleware, verifyCheckoutSession);

export default router;
