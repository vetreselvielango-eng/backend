import mongoose from "mongoose";  // Import mongoose library

const productSchema = new mongoose.Schema(    // Define the schema for Product model
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "VR",
    },

    countInStock: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }  // Automatically manage createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema); // Create the Product model using the schema

export default Product;
