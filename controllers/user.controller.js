import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import crypto from 'crypto'
// crypto.randomBytes(256,(err,buffer)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(buffer.toString('hex'))
// })

//register user
export const registerUser = async (req, res, next) => {
  const { userName, email, password, role } = req.body;
  try {
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
      return res
        .status(400)
        .json({ success: true, message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new User({
      userName,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User created", data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      userName: user.userName,
      userEmail: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};
//login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, messagae: "Wrong password" });
    }
    const token = generateToken(user);
    const { password: userPassword, role, ...rest } = user._doc;
    return res
      .status(200)
      .json({
        success: true,
        message: "Login success",
        token,
        data: rest,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//getall users
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Users found", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//edit user
export const editUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid" });
    }
    await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true });
    return res.status(200).json({ success: true, message: "User edited" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
