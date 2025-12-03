import express from "express";
import protect from "../middleware/protect.js";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// ✅ PROTECTED ROUTE (TEST)
router.get("/profile", protect, (req, res) => {
    res.json({
      message: "Protected route working",
      user: req.user,
    });
  });
  

export default router;
