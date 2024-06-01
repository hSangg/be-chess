import mongoose from "mongoose";

const rankSchema = new mongoose.Schema({
    user: Object,
    mark: Number
})

export default mongoose.model("rank", rankSchema);
