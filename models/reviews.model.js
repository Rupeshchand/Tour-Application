import mongoose from "mongoose";
const reviewsSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    reviewText:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
export default mongoose.model("Reviews",reviewsSchema)