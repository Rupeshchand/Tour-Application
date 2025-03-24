import mongoose from "mongoose";
import Tours from "../models/tours.model.js";

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
      featured,
    });
    await tours.save();
    console.log(tours);
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
      return res.status(400).json({ success: false, message: "ID not found" });
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
    console.log(error)
    return res.status(500).json({success:false,message:"Internal Server error"})
  }
};

//get all tours
export const getAllTours = async(req,res)=>{
    try {
        const tours = await Tours.find()
        if(!tours){
            return res.status(404).json({success:false,message:"Tours not found"})
        }
        return res.status(200).json({success:true,message:"Tours found",data: tours})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

//delete tour
export const deleteTour = async(req,res)=>{
    const tourId = req.params.id
    try {
        if(!mongoose.Types.ObjectId.isValid(tourId)){
            return res.status(400).json({success:false,message:"ID not found"})
        }
        const tour  = await Tours.findById(tourId)
        if(!tour){
            return res.status(404).json({success:false,message:"Tour not found"})
        }
        await Tours.findByIdAndDelete(tourId)
        return res.status(200).json({success:true,message:"Tour Deleted"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}