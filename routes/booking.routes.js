import express from "express";
import {
  cancelBooking,
  createBooking,
  editBooking,
  getAllBooking,
  // getAllBookings,
  getBookingById,
  getBookingsOnUserId,
} from "../controllers/bookings.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const route = express.Router();
route.post(
  "/createbooking/:tourId",
  authenticate,
  restrict(["user", "admin"]),
  createBooking
);
route.put(
  "/editbooking/:bookingId",
  authenticate,
  restrict(["user", "admin"]),
  editBooking
);

route.get("/allbookings",authenticate,restrict(["admin"]),getAllBooking)
route.get(
  "/bookings/user",
  authenticate,
  restrict(["user", "admin"]),
  getBookingsOnUserId
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
