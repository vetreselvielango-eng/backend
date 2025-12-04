import express from "express";
import { getServices, addService } from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getServices);     // ✅ GET services
router.post("/", addService);    // ✅ POST service (for testing)

export default router;
