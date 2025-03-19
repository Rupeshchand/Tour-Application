import mongoose from "mongoose";
const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance:{
    type:String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  // reviews: [
  //   { type: mongoose.Schema.Types.ObjectId, required: true },
  //   // {
  //   //     id:{
  //   //         type:mongoose.Schema.Types.ObjectId,
  //   //         ref:"Reviews",
  //   //         required:true
  //   //     }
  //   // }
  // ],
  photo: {
    type: String,
    required: true,
  },
  featured: {
    type:Boolean,
    required: true
  },
});
export default mongoose.model("Tours", tourSchema);
