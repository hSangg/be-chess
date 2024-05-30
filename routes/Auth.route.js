import express from "express";
import {
  register,
  login,
  forgotPassword,

} from "../controllers/Auth.controller.js";

const router = express.Router();

router.post("/signUp", register);
router.post("/signIn", login);
router.post("/resetPassword", forgotPassword)
export default router;
