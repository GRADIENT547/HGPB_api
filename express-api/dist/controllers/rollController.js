"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SlotMachine_1 = require("../models/SlotMachine");
const PlayerService_1 = __importDefault(require("../services/PlayerService"));
class RollController {
    static async Roll(req, res) {
        const { nickname, deposit } = req.body;
        const player = new PlayerService_1.default();
        const slotMachine = new SlotMachine_1.SlotMachine();
        try {
            // await pool.query('INSERT INTO players (nickname) VALUES ($1)', [nickname]);
            return res.status(201).json({ message: "Roll executed successfully" });
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to execute roll" });
        }
    }
}
exports.default = RollController;
//# sourceMappingURL=rollController.js.map