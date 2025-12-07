import Booking from "../models/Booking.js";

// ✅ USER: CREATE BOOKING
export const createBooking = async (req, res) => { // Protected route; req.user is available
  try {
    const { service, date, days } = req.body;   // Destructure booking details from request body

    const booking = new Booking({                 // Create new booking instance
      user: req.user._id,
      service,
      date,
      days,
    });

    await booking.save();                     // Save booking to database       
    res.status(201).json({ message: "Booking created", booking }); // Respond with success
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};

// ✅ USER: GET MY BOOKINGS
export const getMyBookings = async (req, res) => {  // Protected route; req.user is available
  const bookings = await Booking.find({ user: req.user._id }).sort({    // Find bookings for logged-in user
    createdAt: -1,          // Sort by most recent
  });
  res.json(bookings);   // Respond with user's bookings
};

// ✅ ADMIN: GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {     // Protected & admin route
  const bookings = await Booking.find()                 // Find all bookings
    .populate("user", "name email")   // Populate user details (name, email)
    .sort({ createdAt: -1 });   // Sort by most recent

  res.json(bookings);   // Respond with all bookings
};
