import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//function to upload and image from url
export const uploadImage = async(imageUrl)=>{
    try {
        const result = await cloudinary.uploader.upload(imageUrl);
        return result.secure_url; //Returns the uploaded image URL
    } catch (error) {
        console.error('Upload Error:',error);
    }
}