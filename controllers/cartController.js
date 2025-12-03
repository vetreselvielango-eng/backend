import Cart from "../models/Cart.js";

// ✅ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.json({ message: "Added to cart" });
  } catch (error) {
    console.log("Add Cart Error:", error);
    res.status(500).json({ message: "Cart failed" });
  }
};

// ✅ GET CART BY USER WITH PRODUCT DETAILS (FIXED)
export const getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId })
      .populate({
        path: "items.productId",
        model: "Product",   // ✅ explicitly mention model
      });

    res.json(cart);
  } catch (error) {
    console.log("Get Cart Error:", error);
    res.status(500).json({ message: "Unable to fetch cart" });
  }
};
