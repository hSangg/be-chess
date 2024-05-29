import gameModel from "../models/game.model.js";

const saveGameService = async (req, res) => {
    const pieceDataList = req.body;
    console.log(pieceDataList)
    const count = await gameModel.countDocuments({});
    try {
        const game = new gameModel({
            game: count ? count : 0,
            pieces: pieceDataList
        })
        await game.save()
        res.status(201).send({
            status: 201,
            message: "Game saved"
        })
    }
    catch (err) {
        res.status(400).send({
            status: 400,
            message: "An error occur",
            error: err.message
        })
    }
}

const loadGameService = async (req, res) => {
    try {
        const listGame = await gameModel.find({});
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
export { saveGameService, loadGameService };