-- Создаем таблицу пользователей
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(50) UNIQUE NOT NULL,
    balance DECIMAL(10,2) NOT NULL DEFAULT 1000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем таблицу круток
CREATE TABLE IF NOT EXISTS spins (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
    bet_amount DECIMAL(10,2) NOT NULL,
    result VARCHAR(20) NOT NULL,
    payout DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставляем тестовых игроков
INSERT INTO players (nickname, balance) VALUES ('TestPlayer1', 10000) ON CONFLICT (nickname) DO NOTHING;