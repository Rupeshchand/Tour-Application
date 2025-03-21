import express from "express";
import { createBooking } from "../controllers/bookings.controller.js";
import { authenticate } from "../auth/verifyToken.js";
const route = express.Router();
route.post("/createbooking", authenticate, createBooking);
export default route;
