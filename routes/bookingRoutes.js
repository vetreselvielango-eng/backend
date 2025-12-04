import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
} from "../controllers/bookingController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// USER
router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);

// ADMIN
router.get("/admin/all", protect, admin, getAllBookings);

export default router;
