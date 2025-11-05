import { getDbConnection } from '../database';
import type { Task } from '../types/task';

type CreateTaskData = Omit<Task, 'id' | 'completed' | 'createdAt'>;

type UpdateTaskData = Partial<Omit<Task, 'id' | 'createdAt'>>;

export async function getAllTasks() {
    const db = await getDbConnection();
    return db.all<Task[]>('SELECT * FROM tasks ORDER BY createdAt DESC');
}

export async function getTaskById(id: number) {
    const db = await getDbConnection();
    const task = await db.get<Task>('SELECT * FROM tasks WHERE id = ?', id);
    return task;
}

export async function createTask(data: CreateTaskData) {
    const db = await getDbConnection();
    const { title, description } = data;

    const createdAt = new Date().toISOString();

    const result = await db.run(
        'INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, ?, ?)',
        title,
        description || '',
        false,
        createdAt
    );

    if (!result.lastID) {
        throw new Error('Falha ao criar tarefa: não foi possível obter o ID.');
    }

    return getTaskById(result.lastID);
}

export async function updateTask(id: number, data: UpdateTaskData) {
    const db = await getDbConnection();
    const task = await getTaskById(id);

    if (!task) {
        return null;
    }

    const updatedData = { ...task, ...data };

    await db.run(
        'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
        updatedData.title,
        updatedData.description,
        updatedData.completed,
        id
    );

    return getTaskById(id);
}

export async function deleteTask(id: number) {
    const db = await getDbConnection();
    const task = await getTaskById(id);

    if (!task) {
        return null;
    }

    await db.run('DELETE FROM tasks WHERE id = ?', id);

    return task;
}