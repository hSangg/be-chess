import express from "express";
import { saveGame, loadGame, loadGameById } from "../controllers/Game.controller.js";

const router = express.Router();

router.post('/save', saveGame)
router.get('/load', loadGame)
router.get('/loadById', loadGameById)
export default router;