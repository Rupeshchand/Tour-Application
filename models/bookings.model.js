import mongoose from "mongoose";
const bookingsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  tourName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  guestSize: {
    type: Number,
    min: 2,
    max: 10,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
//   status: {
//     type: String,
//     default: "active",
//   },
  bookAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("Bookings", bookingsSchema);
