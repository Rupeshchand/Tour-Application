import express from "express";
import {
  cancelBooking,
  createBooking,
  getAllBookings,
  getBookingById,
} from "../controllers/bookings.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const route = express.Router();
route.post("/createbooking/:tourId", authenticate, restrict(["user","admin"]), createBooking);
route.get("/bookings/user", authenticate, getAllBookings);
route.get("/bookings/:bookingId", authenticate, getBookingById);
route.put("/:bookingId/cancel", authenticate, cancelBooking);
export default route
