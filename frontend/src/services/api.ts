import axios from 'axios';
import type { Task, CreateTaskData, UpdateTaskData } from '../types/task';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTasks = async (): Promise<Task[]> => {
    const response = await apiClient.get('/tasks');
    return response.data;
};

export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
};


export const updateTask = async (
    id: number,
    taskData: UpdateTaskData
): Promise<Task> => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
};