import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    game: Number,
    pieces: [Object]
})

export default mongoose.model("game", gameSchema);