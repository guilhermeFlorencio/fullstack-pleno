export interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: string;
}

export type CreateTaskData = Omit<Task, 'id' | 'completed' | 'createdAt'>;


export type UpdateTaskData = Partial<Omit<Task, 'id' | 'createdAt'>>;