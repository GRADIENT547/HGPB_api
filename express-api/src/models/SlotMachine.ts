class Symbol {
    public name: string;
    public x2multiplier: number;
    public x3multiplier: number;

    constructor(name: string = "Default", x2multiplier: number = 2, x3multiplier: number = 3) {
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

    private symbols: Symbol[];

    constructor(symbols: Symbol[] = [
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

    random(): Symbol {
        const index = Math.floor(Math.random() * this.symbols.length);

        const symbol = this.symbols[index];
        if (!symbol) {
            throw new Error("Invalid symbol index generated.");
        }

        return symbol;
    }
}

class SlotMachine {
    private wheels_amount: number;
    private wheel: SpinWheel;
    private combination: Symbol[];

    constructor(wheel: SpinWheel = new SpinWheel(),  wheels_amount: number = 3) {
        this.wheels_amount = wheels_amount;
        this.wheel = wheel;
        this.combination = [];
    }

    async spin(bet: number): Promise<{combination: string[], win: number}> {
        this.combination = [];
        console.log(`Bet of ${bet} placed. Spinning the wheel...`);

        for (let wheelIndex = 1; wheelIndex <= this.wheels_amount; wheelIndex++) {
            const result: Symbol | undefined = this.wheel.random();
            if (result) {
                this.combination.push(result);
            } else {
                console.log(`Error: No symbol returned for wheel ${wheelIndex}.`);
            }
        }

        console.log(`Combination: ${this.combination.map(s => s.name).join(', ')}`);

        // <-- Validate symbols in the combination -->
        for (const symbol of this.combination) {
            if (!symbol) {
                throw new Error("Invalid symbol in combination.");
            }
            const { name, x2multiplier, x3multiplier } = symbol;
            if (!name || !x2multiplier || !x3multiplier) {
                throw new Error("Invalid symbol properties.");
            }
        }
        // <-- -- -->

        for (let i = 0; i < this.combination.length - 1; i++) {

            const currentSymbol = this.combination[i];
            const secondSymbol = this.combination[i + 1];
            const thirdSymbol = this.combination[i + 2];

            if (i + 1 < this.combination.length && currentSymbol && secondSymbol && currentSymbol.name === secondSymbol.name) {
                if (i + 2 < this.combination.length && thirdSymbol && currentSymbol.name === thirdSymbol.name) {
                    const win: number = bet * currentSymbol.x3multiplier;
                    console.log(`Three of a kind! You win ${win}.`);
                    return {combination: this.combination.map(s => s.name), win};
                } else {
                    const win: number = bet * currentSymbol.x2multiplier;
                    console.log(`Two of a kind! You win ${win}.`);
                    return {combination: this.combination.map(s => s.name), win};
                }
            }
        }

        console.log("No winning combination. Better luck next time!");
        return {combination: this.combination.map(s => s.name), win: 0};
    }
 
}

const siga = new Symbol('Siga', 2, 6);
const beer = new Symbol('Beer', 3, 9);
const puck = new Symbol('Puck', 5, 15);
const phone = new Symbol('Phone', 10, 100);
const symbols = [siga, beer, puck, phone];

const spinWheel = new SpinWheel(symbols);
const slotMachine = new SlotMachine(spinWheel, 3);

export default slotMachine;

console.log('Slot machine loaded successfully...');