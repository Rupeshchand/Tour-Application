import mongoose from 'mongoose'
const aboutSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    skills:[{type:String,required:true}],
    experience:[{
        company:String,
        role:String,
        duration:String
    }],
    socialLinks:{
        linkedin:String,
        github:String,
    }
})

export default mongoose.model("About",aboutSchema)