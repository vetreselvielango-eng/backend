import express from "express";
import { saveMessage, getMessages } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", saveMessage);   // ✅ Save contact
router.get("/", getMessages);    // ✅ View contact messages

export default router;
