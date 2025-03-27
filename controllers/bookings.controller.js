import Booking from "../models/bookings.model.js";
import User from "../models/user.model.js";
import Tours from "../models/tours.model.js";
import mongoose from "mongoose";

//create booking
export const createBooking = async (req, res) => {
  try {
    const { fullName, guestSize, phone } = req.body;
    const { tourId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res
        .status(400)
        .json({ success: false, message: "Tour ID is not valid" });
    }
    const tour = await Tours.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, json: "Tour not found" });
    }
    const userId = req.userId;
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
    // if(booking){
    //   return res.status(401).json({success:false,message:"You have already booked on this tour"})
    // }
    await booking.save();
    return res.status(200).json({
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

//get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Booking found",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//get all bookings for user
export const getBookingsOnUserId = async (req, res) => {
  const userId = req.userId;
  const userName = req.userName;
  try {
    const bookings = await Booking.find({ userId });
    if (!bookings || bookings.length === 0) {
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

//edit booking
export const editBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log(bookingId);
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is not valid" });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "No Booking found on this ID" });
    }
    await Booking.findByIdAndUpdate(
      bookingId,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, message: "Booking edited" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
//get single booking details by id
export const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    if (!bookingId) {
      return res
        .status(401)
        .json({ success: false, message: "Booking ID is not correct" });
    }
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
  try {
    const { bookingId } = req.params;
    if (!bookingId) {
      return res
        .status(401)
        .json({ success: false, message: "Booking ID is not correct" });
    }
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
