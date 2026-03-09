import Player from "../models/Player";
export default class PlayerRepository {
    findByNickname(nickname: string): Promise<Player | null>;
    createPlayer(nickname: string): Promise<void>;
    updateBalance(nickname: string, newBalance: number): Promise<void>;
}
//# sourceMappingURL=PlayerRepository.d.ts.map