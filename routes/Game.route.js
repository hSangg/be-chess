import express from "express";
import { saveGame } from "../controllers/Game.controller.js";

const router = express.Router();

router.post('/save', saveGame)

export default router;