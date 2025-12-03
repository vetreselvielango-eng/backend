import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
    });

    // ✅ Save payment to MongoDB
    const newPayment = new Payment({
      amount,
      status: paymentIntent.status,
      paymentId: paymentIntent.id,
    });

    await newPayment.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
