import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  OTP: String,
  createdAt: { type: Date, expires: "5m", default: Date.now },
});

export default mongoose.model("OTP", otpSchema);
