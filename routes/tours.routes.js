import express from "express";
import {
  createTour,
  deleteTour,
  editTour,
  getAllTours,
  getSingleTour,
  getToursOnQueries,
} from "../controllers/tours.controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const route = express.Router();
// "http://localhost/api/tour/createtour"
route.post("/createtour", authenticate, restrict(["admin"]), createTour);
route.put("/edittour/:id", authenticate, restrict(["admin"]), editTour);
route.get("/getsingletour/:id", getSingleTour);
route.get("/getalltours", getAllTours);
route.delete("/deletetour/:id", restrict(["admin"]), deleteTour);
route.get(
  "/search",
  authenticate,
  restrict(["admin", "user"]),
  getToursOnQueries
);
export default route;
