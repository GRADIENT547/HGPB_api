declare class DatabaseService {
    private pool;
    constructor();
    query<T = any>(text: string, params?: any[]): Promise<T[]>;
    transaction<T>(callback: (client: any) => Promise<T>): Promise<T>;
    close(): Promise<void>;
}
export default DatabaseService;
//# sourceMappingURL=db.d.ts.map