declare class Symbol {
    name: string;
    x2multiplier: number;
    x3multiplier: number;
    constructor(name?: string, x2multiplier?: number, x3multiplier?: number);
}
declare class SpinWheel {
    private symbols;
    constructor(symbols?: Symbol[]);
    getSymbols(): Symbol[];
    random(): Symbol;
}
declare class SlotMachine {
    private balance;
    private bet;
    private wheels_amount;
    private wheel;
    private combination;
    constructor(balance?: number, bet?: number, wheel?: SpinWheel, wheels_amount?: number);
    spin(): void;
}
declare const spinWheel: SpinWheel;
export { spinWheel, SlotMachine };
//# sourceMappingURL=SlotMachine.d.ts.map