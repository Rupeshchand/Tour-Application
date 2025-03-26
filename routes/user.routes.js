import express from "express";
import {
  editUser,
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const route = express.Router();
route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/getallusers", authenticate, restrict(["admin"]), getAllUsers);
route.put("/edituser/:id", authenticate, restrict(["user", "admin"]), editUser);
export default route;
