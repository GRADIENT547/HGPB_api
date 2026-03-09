import Player from "../models/Player";
export default class PlayerService {
    private playerRepository;
    createPlayer(nickname: string): Promise<void>;
    getPlayer(nickname: string): Promise<Player | null>;
    processBet(nickname: string, bet: number): Promise<{
        success: boolean;
        message: string;
        newBalance?: number;
    }>;
    addWinnings(nickname: string, winnings: number): Promise<Player | null>;
}
//# sourceMappingURL=PlayerService.d.ts.map