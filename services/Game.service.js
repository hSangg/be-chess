import gameModel from "../models/game.model.js";
import mongoose from "mongoose";

const saveGameService = async (req, res) => {
    try {
        const pieceDataList = req.body;

        const count = await gameModel.countDocuments({});

        const game = new gameModel({
            game: count ? count : 0,
            pieces: pieceDataList
        });
        await game.save();

        res.status(201).send({
            status: 201,
            message: "Game saved"
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "An error occurred",
            error: err.message
        });
    }
};

const loadGameService = async (req, res) => {
    try {
        const listGame = await gameModel.find({}).sort({ game: 1 });
        res.status(200).json({
            status: 200,
            listGame: listGame
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Server Error'
        });
    }
};

const ObjectId = mongoose.Types.ObjectId;
const loadGameByIdService = async (req, res) => {
    const id = req.query.id;
    try {
        const game = await gameModel.findOne({ "_id": new ObjectId(id) })
        res.status(200).json({
            status: 200,
            game: game
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Server Error'
        });
    }
}
export { saveGameService, loadGameService, loadGameByIdService };