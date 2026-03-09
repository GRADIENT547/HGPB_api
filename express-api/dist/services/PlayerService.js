"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerRepository_1 = __importDefault(require("../repositories/PlayerRepository"));
class PlayerService {
    playerRepository = new PlayerRepository_1.default();
    async createPlayer(nickname) {
        await this.playerRepository.createPlayer(nickname);
    }
    async getPlayer(nickname) {
        return await this.playerRepository.findByNickname(nickname);
    }
    async processBet(nickname, bet) {
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
    async addWinnings(nickname, winnings) {
        const player = await this.playerRepository.findByNickname(nickname);
        if (!player) {
            return null;
        }
        player.updateBalance(winnings);
        await this.playerRepository.updateBalance(nickname, player.balance);
        return player;
    }
}
exports.default = PlayerService;
//# sourceMappingURL=PlayerService.js.map