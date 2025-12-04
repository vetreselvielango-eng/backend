import Booking from "../models/Booking.js";

// ✅ USER: CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { service, date, days } = req.body;

    const booking = new Booking({
      user: req.user._id,
      service,
      date,
      days,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// ✅ USER: GET MY BOOKINGS
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(bookings);
};

// ✅ ADMIN: GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(bookings);
};
