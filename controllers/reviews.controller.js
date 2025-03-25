import Reviews from "../models/reviews.model.js";
import User from "../models/user.model.js";
import Tours from "../models/tours.model.js";
import mongoose from "mongoose";

//create review
export const createReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const userName = user.userName;
    const { reviewText, rating } = req.body;
    const { tourId } = req.params;
    const tours = await Tours.findById(tourId);
    const tourName = tours.title;
    const review = new Reviews({
      userName,
      reviewText,
      rating,
      tourName,
      tourId,
    });
    await review.save();
    await Tours.findByIdAndUpdate(tourId, { $push: { reviews: review._id } });
    return res.status(200).json({ success: true, message: "Review created" });
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

//edit review
export const editReview = async (req, res) => {
  // const userId = req.userId
  // const user = await User.findById(userId)
  // const userName = user.userName
  const { reviewId } = req.params;
  try {
    if (!reviewId) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    await Reviews.findByIdAndUpdate(
      reviewId,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, message: "Review edited" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//delete review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await Reviews.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    await Reviews.findByIdAndDelete(reviewId);
    return res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find();
    if (!reviews) {
      return res
        .status(404)
        .json({ success: false, message: "No reviews found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Reviews found", reviews });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
};

//get review by tour ID
export const getReviews = async (req, res) => {
  try {
    const { tourId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res
        .status(400)
        .json({ success: false, message: "Tour ID is not valid" });
    }
    const tours = await Tours.findById(tourId);
    if (!tours) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    const reviews = await Reviews.find({ tourId });
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No review found on this ${tours.title}`,
      });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: `Reviews found on ${tours.title}`,
        reviews,
        count: reviews.length,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
