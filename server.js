import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";    
import bookingRoutes from "./routes/bookingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);           //routes for user authentication
app.use("/api/bookings", bookingRoutes);    //routes for booking VR experiences
app.use("/api/orders", orderRoutes);          //routes for managing orders 
app.use("/api/products", productRoutes);          // ✅ All routes starting with /api/products go to productRoutes
app.use("/api/services", serviceRoutes);    //routes for managing services
app.use("/api/contact", contactRoutes);     //routes for contact form submissions
app.use("/api/checkout", paymentRoutes);  //routes for payment processing

app.get("/", (req, res) => {               //basic route to test if the backend is running
  res.send("Backend API is running");        //send a simple message back to the client
});

const PORT = process.env.PORT || 5000;      //set the port from environment variable or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  //start the server and listen on the specified port
