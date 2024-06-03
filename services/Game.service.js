import gameModel from "../models/game.model.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import rankModel from "../models/rank.model.js";
import { ClientSession } from "mongodb";

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
const bonusMarkUserService = async (req, res) => {
    try {
        const { user_id, mark } = req.body;
        let mark_num = Number.parseInt(mark);

        console.log("mark_num ", mark_num)
        
        // Use `await` to ensure the promise is resolved before moving on
        const user = await userModel.findOne({ _id: user_id });

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }

        const rankEntry = await rankModel.findOne({ user });

        console.log("rankEntry: ", rankEntry)

        if (rankEntry) {
            // User exists in rank, update the mark

            rankEntry.mark += mark_num;
            await rankEntry.save();
        } else {
            // User does not exist in rank, create a new rank entry
            const newRankEntry = new rankModel({
                user,  // Store the user's ID instead of the full user object
                mark: mark_num
            });
            await newRankEntry.save();
        }

        return res.status(200).json({
            status: 200,
            message: 'Bonus mark added successfully'
        });

    } catch (err) { 
        console.error(err);
        return res.status(500).json({
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

const getTop5UserService = async(req,res) => {
    try {
        const topUsers = await rankModel.aggregate([
            { $sort: { mark: -1 } },
            { $limit: 5 }
          ]);
        
        return res.status(200).json({
            status: 200,
            topUsers: topUsers
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Server Error'
        });
      }
}

export { saveGameService, loadGameService, loadGameByIdService, bonusMarkUserService, getTop5UserService };