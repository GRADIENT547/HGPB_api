"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerService_1 = __importDefault(require("../services/PlayerService"));
class PlayerController {
    static async getPlayer(req, res) {
        const playerService = new PlayerService_1.default();
        try {
            if (!req.params || !req.params.nickname || typeof req.params.nickname !== "string") {
                return res.status(400).json({ error: "Nickname parameter is required" });
            }
            const result = await playerService.getPlayer(req.params.nickname);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to retrieve player" });
        }
    }
    static async newPlayer(req, res) {
        const { nickname } = req.body;
        const playerService = new PlayerService_1.default();
        try {
            if (!nickname || typeof nickname !== "string") {
                return res.status(400).json({ error: "Nickname is required" });
            }
            await playerService.createPlayer(nickname);
            return res.status(201).json({ message: `Player ${nickname} created successfully` });
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to create player" });
        }
    }
}
exports.default = PlayerController;
//# sourceMappingURL=playerController.js.map