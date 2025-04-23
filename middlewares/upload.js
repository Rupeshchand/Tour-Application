import multer from "multer";
import path from "path"
const storage = multer.diskStorage({
  destination: (req, file, path) => {
    cb(null, "uploads/");
  },
  filename: (req,file,cb) => {
    const ext = path.extname(file.originalname)
    cb(null,`${Date.now()}-${file.fieldname}${ext}`)
  },
});
const upload = multer({storage:storage}) 
export default upload