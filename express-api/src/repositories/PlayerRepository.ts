import Player from "../models/Player";
import DatabaseService from "../db/db";

export default class PlayerRepository {

    async findByNickname(nickname: string): Promise<Player | null> {
        const pool = new DatabaseService();
        try {
            const result = await pool.query('SELECT * FROM players WHERE nickname = $1', [nickname]);
            if (result.length === 0) {
                return null;
            }
            const playerData = result[0];
            return new Player(playerData.nickname, Number(playerData.balance));
        } catch (error) {
            console.error('Error fetching player:', error);
            throw error;
        }
    }

    async createPlayer(nickname: string): Promise<void> {
        const pool = new DatabaseService();
        try {
            const result = await pool.query('INSERT INTO players (nickname, balance) VALUES ($1, $2) RETURNING *', [nickname, 1000]);
            if (result.length === 0) {
                throw new Error("Failed to create player");
            }
        } catch (error) {
            console.error('Error creating player:', error);
            throw error;
        }
    }

    async updateBalance(nickname: string, newBalance: number): Promise<void> {
        const pool = new DatabaseService();
        try {
            await pool.query('UPDATE players SET balance = $1 WHERE nickname = $2', [newBalance, nickname]);
        } catch (error) {
            console.error('Error updating player balance:', error);
            throw error;
        }
    }

}