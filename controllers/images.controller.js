import { uploadImage } from "../utils/cloudinary.js";

export const createImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Image URL is required" });
    }
    const uploadedUrl = await uploadImage(imageUrl);
    if (!uploadedUrl) {
      return res.status(404).json({ success: false, error: "Image not found" });
    }
    return res.status(200).json({ success: true, url: uploadedUrl });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Image upload failed" });
  }
};
