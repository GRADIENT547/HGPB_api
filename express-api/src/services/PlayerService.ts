import Player from "../models/Player";
import PlayerRepository from "../repositories/PlayerRepository";

export default class PlayerService {
    private playerRepository = new PlayerRepository();

    async createPlayer(nickname: string): Promise<void> {
        await this.playerRepository.createPlayer(nickname);
    }

    async getPlayer(nickname: string): Promise<Player | null> {
        return await this.playerRepository.findByNickname(nickname);
    }

    async processBet(nickname: string, bet: number): Promise<{
        success: boolean;
        message: string;
        newBalance?: number
    }> {

        const player = await this.playerRepository.findByNickname(nickname);
        if (!player) {
            return { success: false, message: "Player not found" };
        }

        if (!player.canAfford(bet)) {
            return { success: false, message: "Insufficient balance" };
        }

        player.updateBalance(-bet);
        await this.playerRepository.updateBalance(nickname, player.balance);

        return {
            success: true,
            message: `Bet processed. New balance: ${player.balance}`,
            newBalance: player.balance
        };
    }

    async addWinnings(nickname: string, winnings: number): Promise<Player | null> {
        const player = await this.playerRepository.findByNickname(nickname);
        if (!player) {
            return null;
        }

        player.updateBalance(winnings);
        await this.playerRepository.updateBalance(nickname, player.balance);

        return player;
    }
}