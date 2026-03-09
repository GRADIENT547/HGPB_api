"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotMachine = exports.spinWheel = void 0;
console.log('Spin service loaded');
class Symbol {
    name;
    x2multiplier;
    x3multiplier;
    constructor(name = "Default", x2multiplier = 2, x3multiplier = 3) {
        if (!name || !x2multiplier || !x3multiplier) {
            throw new Error("Name, x2multiplier, and x3multiplier cannot be empty.");
        }
        if (x2multiplier <= 0 || x3multiplier <= 0) {
            throw new Error("Multipliers must be greater than 0.");
        }
        this.name = name;
        this.x2multiplier = x2multiplier;
        this.x3multiplier = x3multiplier;
    }
}
class SpinWheel {
    symbols;
    constructor(symbols = [
        new Symbol('Value1', 2, 6),
        new Symbol('Value2', 3, 9),
        new Symbol('Value3', 5, 15),
        new Symbol('Value4', 10, 30)
    ]) {
        if (symbols.length < 3) {
            throw new Error("At least 3 symbols are required.");
        }
        this.symbols = symbols;
    }
    getSymbols() {
        return this.symbols;
    }
    random() {
        const index = Math.floor(Math.random() * this.symbols.length);
        console.log('Random number result:', index);
        // console.log(`Symbol name: ${this.symbols[index].name}`);
        const symbol = this.symbols[index];
        if (!symbol) {
            throw new Error("Invalid symbol index generated.");
        }
        return symbol;
    }
}
class SlotMachine {
    balance;
    bet;
    wheels_amount;
    wheel;
    combination;
    constructor(balance = 100, bet = 10, wheel = new SpinWheel(), wheels_amount = 3) {
        this.balance = balance;
        this.bet = bet;
        this.wheels_amount = wheels_amount;
        this.wheel = wheel;
        this.combination = [];
    }
    spin() {
        if (this.bet > this.balance) {
            console.log("Not enough balance to place the bet.");
            return;
        }
        this.balance -= this.bet;
        console.log(`Bet of ${this.bet} placed. Current balance: ${this.balance}`);
        for (let wheelIndex = 1; wheelIndex <= this.wheels_amount; wheelIndex++) {
            const result = this.wheel.random();
            if (result) {
                this.combination.push(result);
            }
            else {
                console.log(`Error: No symbol returned for wheel ${wheelIndex}.`);
            }
        }
        console.log(`Combination: ${this.combination.map(s => s.name).join(', ')}`);
        // Validate symbols in the combination
        for (const symbol of this.combination) {
            console.log(`Checking symbol: ${symbol.name}`);
            if (!symbol) {
                console.log("Error: Invalid symbol in combination.");
                return;
            }
            const { name, x2multiplier, x3multiplier } = symbol;
            if (!name || !x2multiplier || !x3multiplier) {
                console.log("Error: Symbol properties are missing or invalid.");
                return;
            }
        }
        for (let i = 0; i < this.combination.length - 1; i++) {
            const currentSymbol = this.combination[i];
            const secondSymbol = this.combination[i + 1];
            const thirdSymbol = this.combination[i + 2];
            if (i + 1 < this.combination.length && currentSymbol && secondSymbol && currentSymbol.name === secondSymbol.name) {
                if (i + 2 < this.combination.length && thirdSymbol && currentSymbol.name === thirdSymbol.name) {
                    const winnings = this.bet * currentSymbol.x3multiplier;
                    this.balance += winnings;
                    console.log(`Three of a kind! You win ${winnings}. Current balance: ${this.balance}`);
                    return;
                }
                else {
                    const winnings = this.bet * currentSymbol.x2multiplier;
                    this.balance += winnings;
                    console.log(`Two of a kind! You win ${winnings}. Current balance: ${this.balance}`);
                    return;
                }
            }
        }
        console.log("No winning combination. Better luck next time!");
    }
}
exports.SlotMachine = SlotMachine;
const siga = new Symbol('Siga', 2, 6);
const beer = new Symbol('Beer', 3, 9);
const puck = new Symbol('Puck', 5, 15);
const phone = new Symbol('Phone', 10, 100);
const symbols = [siga, beer, puck, phone];
const spinWheel = new SpinWheel(symbols);
exports.spinWheel = spinWheel;
//# sourceMappingURL=SlotMachine.js.map