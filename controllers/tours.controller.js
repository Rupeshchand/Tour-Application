import mongoose from "mongoose";
import Tours from "../models/tours.model.js";
// import Bookings from "../models/bookings.model.js";

//create tour
export const createTour = async (req, res) => {
  const {
    title,
    city,
    address,
    distance,
    price,
    desc,
    reviews,
    photo,
    maxGroupSize,
    featured,
  } = req.body;
  try {
    const tours = new Tours({
      title,
      city,
      address,
      distance,
      price,
      desc,
      reviews,
      photo,
      maxGroupSize,
      featured,
    });
    if (tours) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Tour is already created on ${tours.title}`,
        });
    }
    if (!maxGroupSize) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You should mention the maximum group size",
        });
    }
    await tours.save();
    return res
      .status(200)
      .json({ success: true, message: "Tour created", data: tours });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//edit tour
export const editTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Tour ID is not valid" });
    }
    const tour = await Tours.findById(tourId);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }
    await Tours.findByIdAndUpdate(tourId, { $set: req.body }, { new: true });
    return res.status(200).json({ success: true, message: "Tour edited" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//get single tour
export const getSingleTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res
        .status(400)
        .json({ success: false, message: "Tour ID is not valid" });
    }
    const tour = await Tours.findById(tourId);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Tour found", data: tour });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

//get all tours
export const getAllTours = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    const tours = await Tours.find().skip(skip).limit(limit);
    const totalTours = await Tours.countDocuments(); //This counts the total number of documents in the Tours collection.
    const totalPages = Math.ceil(totalTours / limit); //This calculates the total number of pages required to display all results.
    if (!tours || tours.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Tours not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Tours found",
      tours,
      pagination: { totalTours, totalPages, currentPage: page, limit },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//delete tour
export const deleteTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res
        .status(400)
        .json({ success: false, message: "Tour ID is not valid" });
    }
    const tour = await Tours.findById(tourId);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }
    await Tours.findByIdAndDelete(tourId);
    return res.status(200).json({ success: true, message: "Tour Deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//get tours by queries
export const getToursOnQueries = async (req, res) => {
  const { city, distance, maxGroupSize } = req.query;
  try {
    // let filter = {}; //This object will store conditions for filtering tours in the database.
    // if (city) {
    //   filter.city = { $regex: city, $options: "i" }; //for case insensitive search
    // }
    // if (distance) {
    //   filter.distance = { $lte: Number(distance) }; //we get tours within the specified distance. If distance=100, it finds all tours ≤ 100 km.
    // }
    // if (maxGroupSize) {
    //   filter.maxGroupSize = { $gte: Number(maxGroupSize) }; //we get tours that can accommodate at least the given group size. If maxGroupSize=5, it finds all tours with at least 5 people.
    // }
    const tours = await Tours.find({
      city: { $regex: city, $options: "i" },
      distance: distance,
      maxGroupSize: maxGroupSize,
    });
    if (!tours || tours.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Sorry! No Trip Found" });
    }
    return res
      .status(200)
      .json({ success: true, count: tours.length, data: tours });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
