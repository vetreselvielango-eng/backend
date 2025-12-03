import express from "express";
import { getProducts, addProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);  // optional admin route

export default router;
