import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order({
      userId: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
      orderStatus: req.body.orderStatus,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
};
