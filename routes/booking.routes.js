import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
} from "../controllers/bookings.controller.js";
import { authenticate } from "../auth/verifyToken.js";
const route = express.Router();
route.post("/createbooking", authenticate, createBooking);
route.get("/bookings/user", authenticate, getAllBookings);
route.get("/bookings/:bookingId", authenticate, getBookingById);
export default route;
