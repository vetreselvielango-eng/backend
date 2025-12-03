import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    service: String,
    date: String,
    days: Number,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
