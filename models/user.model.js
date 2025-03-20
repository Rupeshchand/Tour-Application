import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true   
    },
    role:{
        type:String,
        enum:["user","admin"],
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
export default mongoose.model("User",userSchema)