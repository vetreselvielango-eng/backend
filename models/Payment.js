import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    amount: Number,
    status: String,
    paymentId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
