// import Player from "../models/Player";
// import slotMachine from "../models/SlotMachine";

// const testPlayer = new Player("TestPlayer", 1000);
// console.log(`Player ${testPlayer.nickname} created! Has balance: ${testPlayer.balance}`);

// const betAmount = 100;
// if (testPlayer.canAfford(betAmount)) {
//     testPlayer.updateBalance(-betAmount);
//     const winnings = await slotMachine.spin(betAmount);
//     testPlayer.updateBalance(winnings);
//     console.log(`After spinning the slot machine, ${testPlayer.nickname} has balance: ${testPlayer.balance}`);
// } else {
//     console.log(`Cannot place bet of ${betAmount}. Insufficient balance.`);
// }