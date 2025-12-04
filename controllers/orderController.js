import Order from "../models/Order.js";

// ✅ ADMIN – Get all orders for Dashboard
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("❌ Get All Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ USER – Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("❌ Get My Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

// ✅ Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("❌ Get Order By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// ✅ Delete order (admin or debug)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Order Error:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
