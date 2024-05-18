import express from "express";
import {
  register,
  login,
  forgotPassword,
  checkOTP,
} from "../controllers/Auth.controller.js";

const router = express.Router();

router.post("/signUp", register);
router.post("/signIn", login);
// router.post("/forgotPassword", forgotPassword);
// router.post("/checkOtp", checkOTP);
export default router;
