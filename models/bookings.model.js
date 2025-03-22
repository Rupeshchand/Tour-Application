import mongoose from "mongoose"
const bookingsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    tourName:{
        type:String,
        require:true
    },
    fullName:{
        type:String,
        required:true
    },
    guestSize:{
        type:Number,
        min: 2,
        max: 10,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    bookAt:{
        type:Date,
        deafult: Date.now()
    },
    createdAt:{
        type:Date,
        deafult: Date.now()
    },
    updatedAt:{
        type:Date,
        deafult: Date.now()
    }
})
export default mongoose.model("Bookings",bookingsSchema)