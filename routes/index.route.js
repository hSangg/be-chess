import express from "express";
import authRouter from "./Auth.route.js";
import gameRouter from "./Game.route.js"
const router = express.Router();

router.use("/auth", authRouter);
router.use("/game", gameRouter)
export default router;
