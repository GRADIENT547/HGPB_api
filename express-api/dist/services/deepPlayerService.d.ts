import Player from '../models/Player';
export declare class PlayerService {
    private playerRepo;
    processBet(nickname: string, betAmount: number): Promise<{
        success: boolean;
        player?: Player;
        message: string;
    }>;
    addWinnings(nickname: string, winnings: number): Promise<Player | null>;
}
//# sourceMappingURL=deepPlayerService.d.ts.map