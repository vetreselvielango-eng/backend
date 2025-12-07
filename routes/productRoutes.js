import express from "express";
import { getProducts, addProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts); // public route to get all products
router.post("/", addProduct);  // protected route to add a new product

export default router;
