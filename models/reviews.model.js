import mongoose from "mongoose";
const reviewsSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  tourId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Tours",
    required:true
  },
  tourName:{
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Reviews", reviewsSchema);
