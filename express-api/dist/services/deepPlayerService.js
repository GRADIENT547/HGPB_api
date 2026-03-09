"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
// services/PlayerService.ts
const PlayerRepository_1 = __importDefault(require("../repositories/PlayerRepository"));
class PlayerService {
    playerRepo = new PlayerRepository_1.default();
    async processBet(nickname, betAmount) {
        // Получаем игрока из БД
        const player = await this.playerRepo.findByNickname(nickname);
        if (!player) {
            return { success: false, message: 'Player not found' };
        }
        // Проверяем и вычитаем баланс (логика в модели)
        if (!player.subtractBalance(betAmount)) {
            return { success: false, message: 'Insufficient funds' };
        }
        // Сохраняем изменения в БД
        await this.playerRepo.updateBalance(player);
        return {
            success: true,
            player,
            message: `Bet placed. New balance: ${player.balance}`
        };
    }
    async addWinnings(nickname, winnings) {
        const player = await this.playerRepo.findByNickname(nickname);
        if (!player)
            return null;
        player.addBalance(winnings);
        await this.playerRepo.updateBalance(player);
        return player;
    }
}
exports.PlayerService = PlayerService;
//# sourceMappingURL=deepPlayerService.js.map