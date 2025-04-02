import express from 'express'
import { about, createAbout, deleteAbout, editAbout } from '../controllers/about.controller.js'
import { authenticate, restrict } from '../auth/verifyToken.js'
const route = express.Router()
route.post("/createabout",authenticate, restrict(["admin"]),createAbout)
route.put("/editabout/:aboutId",authenticate, restrict(["admin"]),editAbout)
route.get("/about",about)
route.delete("/deleteabout/:aboutID",authenticate, restrict(["admin"]),deleteAbout)
export default route