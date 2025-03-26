import express from "express";
import { createImage } from "../controllers/images.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const route = express.Router();
route.post("/upload", authenticate, restrict(["admin"]), createImage);
export default route