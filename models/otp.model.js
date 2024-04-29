import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    user_id: String,
    OTP: String,
    createdAt: { type: Date, expires: '5m', default: Date.now }
})

export default mongoose.model('OTP', otpSchema)