export default class Player {
    nickname: string;
    balance: number;

    constructor(nickname: string, balance: number) {
        this.nickname = nickname;
        this.balance = balance;
    };

    canAfford(bet: number): boolean {
        return this.balance >= bet;
    }

    updateBalance(amount: number): void {
        this.balance += amount;
    }
    
}


console.log("Player loaded successfully...");