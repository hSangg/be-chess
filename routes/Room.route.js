import express from "express";
import { addRoom, getRoom, getRoomInfo } from "../controllers/Room.controller.js";
import { checkPermission } from "../middleware/checkPermission.js";


const router = express.Router();


router.post('/addRoom', checkPermission, addRoom)
router.get('/getRoomInfo', getRoomInfo)
router.get('/getRoom', getRoom)

export default router;