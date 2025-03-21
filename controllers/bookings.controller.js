import Booking from "../models/bookings.model.js";
import User from "../models/user.model.js";

export const createBooking = async (req, res, next) => {
  const { tourName, guestSize, phone } = req.body;
  const userId = req.userId;
  const user = await User.findById(userId);
  const fullName = user.userName;
  const userEmail = user.email;
  //   console.log(userid,userName,userEmail)

  try {
    if (guestSize < 1 && guestSize > 10) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Minimum size is 2 and max size is 10",
        });
    }
    const booking = new Booking({
      userId,
      userEmail,
      tourName,
      fullName,
      guestSize,
      phone,
    });
    await booking.save();
    return res.status(200).json({ success: true, message: "Booking Created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
