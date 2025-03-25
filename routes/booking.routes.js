import express from "express";
import {
  cancelBooking,
  createBooking,
  getAllBookings,
  getBookingById,
} from "../controllers/bookings.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const route = express.Router();
route.post(
  "/createbooking/:tourId",
  authenticate,
  restrict(["user", "admin"]),
  createBooking
);
route.get(
  "/bookings/user",
  authenticate,
  restrict(["user", "admin"]),
  getAllBookings
);
route.get(
  "/bookings/:bookingId",
  authenticate,
  restrict(["user", "admin"]),
  getBookingById
);
route.put(
  "/:bookingId/cancel",
  authenticate,
  restrict(["user", "admin"]),
  cancelBooking
);
export default route;
