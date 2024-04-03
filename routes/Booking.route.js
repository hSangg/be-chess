import express from "express";
import { booking } from "../controllers/Booking.controller.js";

const router = express.Router();

router.post('/bookRoom', booking)

export default router;