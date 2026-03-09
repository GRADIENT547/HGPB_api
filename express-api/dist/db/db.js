"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class DatabaseService {
    pool;
    constructor() {
        const config = {
            host: process.env.PGHOST || 'postgres',
            port: parseInt(process.env.PGPORT || '5432'),
            database: process.env.PGDATABASE || 'mydb',
            user: process.env.PGUSER || 'myuser',
            password: process.env.PGPASSWORD || 'mypassword',
            max: 60, // ⭐ добавляем лимит соединений
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        };
        this.pool = new pg_1.Pool(config);
    }
    async query(text, params) {
        const client = await this.pool.connect(); // ⭐ await здесь!
        try {
            const result = await client.query(text, params);
            return result.rows;
        }
        catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
        finally {
            client.release(); // ⭐ ВОЗВРАЩАЕМ соединение в пул!
        }
    }
    // ⭐ Дополнительные полезные методы
    async transaction(callback) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
    // ⭐ Метод для закрытия всего пула (при завершении приложения)
    async close() {
        await this.pool.end();
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=db.js.map