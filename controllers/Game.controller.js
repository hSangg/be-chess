import { loadGameByIdService, loadGameService, saveGameService, bonusMarkUserService, overrideSaveService } from "../services/Game.service.js";

const saveGame = async (req, res) => {
    await saveGameService(req, res);
}

const loadGame = async (req, res) => {
    await loadGameService(req, res);
}

const loadGameById = async (req, res) => {
    await loadGameByIdService(req, res);
}

const bonusMarkUser = async (req, res) => {
    await bonusMarkUserService(req, res)
}

const overrideSave = async (req, res) => {
    await overrideSaveService(req, res)
}

export { saveGame, loadGame, loadGameById, bonusMarkUser, overrideSave }