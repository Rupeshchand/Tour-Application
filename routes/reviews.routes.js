import express from "express";
import {
  createReview,
  deleteReview,
  editReview,
  getAllReviews,
  getReviews
} from "../controllers/reviews.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const route = express.Router();
route.post("/createreview/:tourId", authenticate, restrict(["user","admin"]), createReview);
route.put(
  "/editreview/:reviewId",
  authenticate,
  restrict(["user", "admin"]),
  editReview
);
route.delete(
  "/deletereview/:reviewId",
  authenticate,
  restrict(["user", "admin"]),
  deleteReview
);
route.get(
  "/getallreviews",
  authenticate,
  restrict(["user", "admin"]),
  getAllReviews
);
route.get(
  "/getreviews/:tourId",
  authenticate,
  restrict(["user", "admin"]),
  getReviews
);
export default route;
