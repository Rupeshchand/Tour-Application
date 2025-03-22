import Reviews from "../models/reviews.model.js";
import User from "../models/user.model.js";
export const createReview = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  const userName = user.userName;
  try {
    const { reviewText, rating } = req.body;
    const review = new Reviews({ userName, reviewText, rating });
    await review.save();
    return res.status(200).json({ success: true, message: "Review created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
