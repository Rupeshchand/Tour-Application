import mongoose from "mongoose";
import About from "../models/about.model.js";

//create about section
export const createAbout = async (req, res) => {
  try {
    const { name, title, description, image, skills, experience, socialLinks } =
      req.body;
    if (
      !name ||
      !title ||
      !description ||
      !image ||
      !skills ||
      !experience ||
      !socialLinks
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const aboutUser = new About({
      name,
      title,
      description,
      image,
      skills,
      experience,
      socialLinks,
    });
    await aboutUser.save();
    return res
      .status(200)
      .json({ success: true, message: "About section is added" });
  } catch (error) {
    return (
      res.status(500),
      json({ success: false, message: "Internal server error" })
    );
  }
};

//edit about section
export const editAbout = async (req, res) => {
  try {
    const { aboutId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(aboutId)) {
      return res
        .status(401)
        .json({ success: false, message: "About ID is not valid" });
    }
    const about = await About.findById(aboutId);
    if (!about) {
      return res
        .status(404)
        .json({
          success: false,
          message: "There is no about section on that ID",
        });
    }
    await About.findByIdAndUpdate(aboutId, { $set: req.body }, { new: true });
    return res.status(200).json({ success: true, message: "About Edited" });
  } catch (error) {
    return (
      res.status(500),
      json({ success: false, message: "Internal server error" })
    );
  }
};

//get about section
export const about = async(req,res)=>{
    try {
        const about = await About.find()
        if(!about || !about.length === 0){
            return res.status(404).json({success:false,message:"No About section found"})
        }
        return res.status(200).json({success:true,message:"About section", data:about})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

//delete about section 
export const deleteAbout = async(req,res)=>{
    try{
        const { aboutID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(aboutID)) {
      return res
        .status(401)
        .json({ success: false, message: "About ID is not valid" });
    }
    const about = await About.findById(aboutID);
    if (!about) {
      return res
        .status(404)
        .json({
          success: false,
          message: "There is no about section on that ID",
        });
    }
    await About.findByIdAndDelete(aboutID);
    return res.status(200).json({ success: true, message: "About Deleted" }); 
    }
    catch (error) {
        return res.statue(500).json({success:false,message:"Internal server error"})
    }
}
