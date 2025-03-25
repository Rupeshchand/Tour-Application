import Booking from "../models/bookings.model.js";
import User from "../models/user.model.js";
import Tours from "../models/tours.model.js";

//create booking
export const createBooking = async (req, res) => {
  try {
    const { fullName, guestSize, phone } = req.body;
    const { tourId } = req.params;
    const userId = req.userId;
    const tour = await Tours.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, json: "Tour not found" });
    }
    const user = await User.findById(userId);
    // const fullName = user.userName;
    const userEmail = user.email;
    const booking = new Booking({
      userId,
      userEmail,
      tourName: tour.title,
      fullName,
      guestSize,
      phone,
    });
    await booking.save();
    return res
      .status(200)
      .json({
        success: true,
        message: `Booking successfully done by ${fullName}`,
      });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        error: error.errors,
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//get all bookings for user
export const getAllBookings = async (req, res) => {
  const userId = req.userId;
  const userName = req.userName;
  try {
    const bookings = await Booking.find({ userId });
    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No bookings found on ${userName}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Booking found on ${userName}`,
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//get single booking details by id
export const getBookingById = async (req, res) => {
  const bookingId = req.params.bookingId;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Bookin not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Booking found", data: booking });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//cancel booking by id
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "No booking found" });
    }
    // booking.status = "cancelled" //for put method
    // await booking.save()
    await Booking.findByIdAndDelete(bookingId); //for delete method
    return res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, mesage: "Internal server error" });
  }
};
