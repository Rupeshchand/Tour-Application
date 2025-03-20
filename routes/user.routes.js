import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const route = express.Router()
route.post("/register",registerUser)
route.post("/login",loginUser)
export default route