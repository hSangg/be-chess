import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    game: String,
    currentColor: Number,
    pieces: [Object]
})

export default mongoose.model("game", gameSchema);