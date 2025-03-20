import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tourRoutes from "./routes/tours.routes.js";
import userRoutes from "./routes/user.routes.js";
const app = express();
const port = process.env.PORT || 6000;
const allowedUrls = ["http:localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedUrls.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api/tour", tourRoutes);
app.use("/api/user", userRoutes);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("DB Connection error");
  }
};
connectDB();
