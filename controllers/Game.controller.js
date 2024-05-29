import { saveGameService } from "../services/Game.service.js";

const saveGame = async (req, res) => {
    await saveGameService(req, res);
}

export { saveGame }