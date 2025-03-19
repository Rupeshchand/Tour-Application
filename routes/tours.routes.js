import express from "express";
import { createTour, deleteTour, editTour, getAllTours, getSingleTour } from "../controllers/tours.controller.js";
const route = express.Router();
// "http://localhost/api/tour/createtour"
route.post("/createtour", createTour);
route.put("/edittour/:id",editTour)
route.get("/getsingletour/:id",getSingleTour)
route.get("/getalltours",getAllTours)
route.delete("/deletetour/:id",deleteTour)
export default route
