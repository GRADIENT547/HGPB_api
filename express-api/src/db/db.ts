import { Pool, PoolConfig } from 'pg';

class DatabaseService {
    private pool: Pool;

    constructor() {
        const config: PoolConfig = {
            host: process.env.PGHOST || 'postgres',
            port: parseInt(process.env.PGPORT || '5432'),
            database: process.env.PGDATABASE || 'mydb',
            user: process.env.PGUSER || 'myuser',
            password: process.env.PGPASSWORD || 'mypassword',
            max: 60, // ⭐ добавляем лимит соединений
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        };

        this.pool = new Pool(config);
    }

    async query<T = any>(text: string, params?: any[]): Promise<T[]> {
        const client = await this.pool.connect(); // ⭐ await здесь!
        
        try {
            const result = await client.query(text, params);
            return result.rows as T[];
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        } finally {
            client.release(); // ⭐ ВОЗВРАЩАЕМ соединение в пул!
        }
    }

    // ⭐ Дополнительные полезные методы
    async transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
        const client = await this.pool.connect();
        
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    // ⭐ Метод для закрытия всего пула (при завершении приложения)
    async close(): Promise<void> {
        await this.pool.end();
    }
}

export default DatabaseService;