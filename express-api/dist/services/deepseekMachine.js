"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SlotMachine {
    // Приватные поля (инкапсуляция)
    reels; // Барабаны с символами
    balance; // Текущий баланс игрока
    bet; // Текущая ставка
    reelCount; // Количество барабанов (readonly - нельзя изменить)
    // Статическое поле (принадлежит классу, а не экземпляру)
    static DEFAULT_SYMBOLS = ['🍒', '🍋', '🍊', '7', '💎', 'BAR'];
    constructor(initialBalance = 100, reelCount = 3) {
        this.balance = initialBalance;
        this.reelCount = reelCount;
        this.bet = 10; // Ставка по умолчанию
        this.initializeReels();
    }
    // Приватный метод для инициализации барабанов
    initializeReels() {
        this.reels = [];
        for (let i = 0; i < this.reelCount; i++) {
            // Каждый барабан содержит случайные символы
            this.reels[i] = this.generateReel();
        }
    }
    // Приватный метод для генерации одного барабана
    generateReel(length = 10) {
        const reel = [];
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * SlotMachine.DEFAULT_SYMBOLS.length);
            reel.push(SlotMachine.DEFAULT_SYMBOLS[randomIndex]);
        }
        return reel;
    }
    // Публичный метод для вращения (основная механика игры)
    spin() {
        // Проверяем, достаточно ли средств
        if (!this.hasEnoughBalance()) {
            throw new Error('Недостаточно средств для игры!');
        }
        // Списываем ставку
        this.balance -= this.bet;
        // Получаем результат вращения
        const result = this.getSpinResult();
        // Вычисляем выигрыш
        const winnings = this.calculateWinnings(result);
        // Начисляем выигрыш
        if (winnings > 0) {
            this.balance += winnings;
        }
        // Возвращаем результат
        return {
            result,
            winnings,
            balance: this.balance,
            isWin: winnings > 0
        };
    }
    // Приватный метод для получения результата вращения
    getSpinResult() {
        const result = [];
        for (let i = 0; i < this.reelCount; i++) {
            const reel = this.reels[i];
            // Берем случайную позицию на барабане
            const randomPosition = Math.floor(Math.random() * reel.length);
            result.push(reel[randomPosition]);
        }
        return result;
    }
    // Приватный метод для подсчета выигрыша
    calculateWinnings(result) {
        // Проверяем все ли символы одинаковые
        const allSame = result.every(symbol => symbol === result[0]);
        if (allSame) {
            // Коэффициенты выигрыша для разных символов
            const multipliers = {
                '🍒': 2,
                '🍋': 3,
                '🍊': 4,
                '7': 10,
                '💎': 20,
                'BAR': 5
            };
            return this.bet * (multipliers[result[0]] || 1);
        }
        // Проверяем на наличие двух одинаковых
        const uniqueSymbols = new Set(result);
        if (uniqueSymbols.size === 2) {
            return this.bet * 1.5; // Маленький выигрыш за пару
        }
        return 0; // Проигрыш
    }
    // Проверка достаточности баланса
    hasEnoughBalance() {
        return this.balance >= this.bet;
    }
    // Геттеры и сеттеры (инкапсуляция)
    getBalance() {
        return this.balance;
    }
    getBet() {
        return this.bet;
    }
    setBet(newBet) {
        if (newBet <= 0) {
            throw new Error('Ставка должна быть положительным числом');
        }
        if (newBet > this.balance) {
            throw new Error('Ставка не может превышать баланс');
        }
        this.bet = newBet;
    }
    // Метод для пополнения баланса
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Сумма должна быть положительной');
        }
        this.balance += amount;
        console.log(`Баланс пополнен на ${amount}. Текущий баланс: ${this.balance}`);
    }
    // Метод для вывода информации
    getInfo() {
        return `Баланс: ${this.balance} | Текущая ставка: ${this.bet}`;
    }
}
// Пример использования
function example() {
    // Создаем экземпляр класса
    const slot = new SlotMachine(200, 3);
    console.log('=== Однорукий бандит ===');
    console.log(slot.getInfo());
    try {
        // Устанавливаем ставку
        slot.setBet(20);
        // Играем несколько раз
        for (let i = 0; i < 5; i++) {
            console.log(`\nВращение #${i + 1}:`);
            const result = slot.spin();
            console.log(`Результат: ${result.result.join(' | ')}`);
            console.log(`Выигрыш: ${result.winnings}`);
            console.log(`Баланс: ${result.balance}`);
            console.log(result.isWin ? '🎉 ПОБЕДА!' : '😢 Проигрыш...');
        }
        // Пополняем баланс
        slot.deposit(50);
        console.log('\n' + slot.getInfo());
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Ошибка:', error.message);
        }
    }
}
// Запускаем пример
example();
//# sourceMappingURL=deepseekMachine.js.map