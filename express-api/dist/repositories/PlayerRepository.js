"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("../models/Player"));
const db_1 = __importDefault(require("../db/db"));
class PlayerRepository {
    async findByNickname(nickname) {
        const pool = new db_1.default();
        try {
            const result = await pool.query('SELECT * FROM players WHERE nickname = $1', [nickname]);
            if (result.length === 0) {
                return null;
            }
            const playerData = result[0];
            return new Player_1.default(playerData.nickname, playerData.balance);
        }
        catch (error) {
            console.error('Error fetching player:', error);
            throw error;
        }
    }
    async createPlayer(nickname) {
        const pool = new db_1.default();
        try {
            const result = await pool.query('INSERT INTO players (nickname, balance) VALUES ($1, $2) RETURNING *', [nickname, 1000]);
            if (result.length === 0) {
                throw new Error("Failed to create player");
            }
        }
        catch (error) {
            console.error('Error creating player:', error);
            throw error;
        }
    }
    async updateBalance(nickname, newBalance) {
        const pool = new db_1.default();
        try {
            await pool.query('UPDATE players SET balance = $1 WHERE nickname = $2', [newBalance, nickname]);
        }
        catch (error) {
            console.error('Error updating player balance:', error);
            throw error;
        }
    }
}
exports.default = PlayerRepository;
//# sourceMappingURL=PlayerRepository.js.map