import express from "express";
import { createReview } from "../controllers/reviews.controller.js";
import { authenticate } from "../auth/verifyToken.js";
const route = express.Router();
route.post("/createreview/:id", authenticate, createReview);
export default route