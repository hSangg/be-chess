import express from "express";
import { saveGame, loadGame, loadGameById, bonusMarkUser } from "../controllers/Game.controller.js";

const router = express.Router();

router.post('/save', saveGame)
router.get('/load', loadGame)
router.get('/loadById', loadGameById)
router.post('/bonusMarkUser', bonusMarkUser)

export default router;