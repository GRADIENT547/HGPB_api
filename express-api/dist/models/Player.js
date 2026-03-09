"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    nickname;
    balance;
    constructor(nickname, balance) {
        this.nickname = nickname;
        this.balance = balance;
    }
    ;
    canAfford(bet) {
        return this.balance >= bet;
    }
    updateBalance(amount) {
        this.balance += amount;
    }
}
exports.default = Player;
const testPlayer = new Player("TestPlayer", 1000);
console.log(`Player ${testPlayer.nickname} created! Has balance: ${testPlayer.balance}`);
testPlayer.updateBalance(200);
console.log(`Player ${testPlayer.nickname} updated balance! New balance: ${testPlayer.balance}`);
//# sourceMappingURL=Player.js.map