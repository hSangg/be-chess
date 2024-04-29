import express from "express";
import { addRoom, getRoom } from "../controllers/Room.controller.js";
import { checkPermission } from "../middleware/checkPermission.js";

const router = express.Router();


router.post('/addRoom', checkPermission, addRoom)
router.get('/getRoom', getRoom)
export default router;