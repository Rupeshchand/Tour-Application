import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    userName: String,
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
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
export default mongoose.model("User",userSchema)