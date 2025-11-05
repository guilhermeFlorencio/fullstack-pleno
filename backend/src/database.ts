import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let dbInstance: Database | null = null;

const CREATE_TABLE_TASKS_SQL = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  );
`;

export async function getDbConnection(): Promise<Database> {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        const dbPath = path.resolve(__dirname, '..', 'database.db');
        console.log(`[DB] Conectando ao banco em: ${dbPath}`);

        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log('[DB] Conexão estabelecida com sucesso.');

        await db.exec(CREATE_TABLE_TASKS_SQL);
        console.log('[DB] Tabela "tasks" inicializada.');

        dbInstance = db;
        return db;

    } catch (error) {
        console.error('[DB] Erro ao inicializar o banco de dados:', error);
        throw new Error('Falha ao conectar ou inicializar o banco de dados.');
    }
}