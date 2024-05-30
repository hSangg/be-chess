import { loadGameService, saveGameService } from "../services/Game.service.js";

const saveGame = async (req, res) => {
    await saveGameService(req, res);
}

const loadGame = async (req, res) => {
    await loadGameService(req, res);
}
export { saveGame, loadGame }