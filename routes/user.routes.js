import express from "express";
import {
  editUser,
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
const route = express.Router();
route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/getallusers", getAllUsers);
route.put("/edituser/:id", editUser);
export default route;
