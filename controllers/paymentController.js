import dotenv from "dotenv";
import Stripe from "stripe";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ POST /api/checkout/create-session
export const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]
    const userId = req.user.id; // from auth middleware

    if (!items || !items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Get products from DB to prevent price tampering
    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const productMap = new Map(
      products.map((p) => [p._id.toString(), p])
    );

    const line_items = items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: Math.round(product.price * 100), // cents
        },
        quantity: item.quantity,
      };
    });

    const cartMetadata = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        userId,
        cart: JSON.stringify(cartMetadata),
      },
    });

    return res.json({
      id: session.id, // used by Stripe.js
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ message: "Failed to create Stripe session" });
  }
};

// ✅ GET /api/checkout/verify-session?session_id=xxx
export const verifyCheckoutSession = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ message: "session_id is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    // If not paid, don't create order
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        paid: false,
        message: "Payment not completed",
      });
    }

    // Avoid duplicate orders if user refreshes Success page
    let existingOrder = await Order.findOne({ stripeSessionId: session.id });
    if (existingOrder) {
      return res.json({
        paid: true,
        order: existingOrder,
      });
    }

    const metadata = session.metadata || {};
    const cartMetadata = metadata.cart ? JSON.parse(metadata.cart) : [];
    const userId = metadata.userId || req.user.id;

    const productIds = cartMetadata.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(
      products.map((p) => [p._id.toString(), p])
    );

    const orderItems = cartMetadata.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) return null;

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    }).filter(Boolean);

    const totalAmount = (session.amount_total || 0) / 100;

    const newOrder = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      currency: session.currency || "usd",
      paymentStatus: "Paid",
      status: "Completed",
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent || "",
    });

    return res.json({
      paid: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Stripe verify error:", error);
    return res.status(500).json({ message: "Failed to verify payment" });
  }
};
