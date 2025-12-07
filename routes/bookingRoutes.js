//This file only decides which controller to run. It does NO database work.

import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
} from "../controllers/bookingController.js";

import protect from "../middleware/authMiddleware.js";  // authentication middleware
import admin from "../middleware/adminMiddleware.js"; // admin authorization middleware

const router = express.Router();    // Create router instance

// USER
router.post("/", protect, createBooking);   // Create booking
router.get("/my-bookings", protect, getMyBookings);   // Get user's bookings

// ADMIN
router.get("/admin/all", protect, admin, getAllBookings);  // Get all bookings for admin

export default router;
