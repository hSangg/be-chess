import express from "express";
import { saveGame, loadGame } from "../controllers/Game.controller.js";

const router = express.Router();

router.post('/save', saveGame)
router.get('/load', loadGame)
export default router;