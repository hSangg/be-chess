import express from "express";
import { booking } from "../controllers/Booking.controller.js";
import { checkPermission } from "../middleware/checkPermission.js";

const router = express.Router();

router.post('/bookRoom', checkPermission, booking)

export default router;