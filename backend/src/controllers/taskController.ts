import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as taskService from '../services/taskService';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';

/**
 * @desc    Buscar todas as tarefas
 * @route   GET /api/tasks
 * @access  Public
 */
export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
});

/**
 * @desc    Buscar uma tarefa por ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido.' });
        return;
    }

    const task = await taskService.getTaskById(id);
    if (!task) {
        res.status(404).json({ message: 'Tarefa não encontrada.' });
        return;
    }
    res.status(200).json(task);
});

/**
 * @desc    Criar uma nova tarefa
 * @route   POST /api/tasks
 * @access  Public
 */
export const createTask = asyncHandler(async (req: Request, res: Response) => {
    const validatedBody = createTaskSchema.parse(req.body);

    const newTask = await taskService.createTask(validatedBody);
    res.status(201).json(newTask);
});

/**
 * @desc    Atualizar uma tarefa
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido.' });
        return;
    }

    const validatedBody = updateTaskSchema.parse(req.body);

    if (Object.keys(validatedBody).length === 0) {
        res.status(400).json({ message: 'Nenhum dado fornecido para atualização.' });
        return;
    }

    const updatedTask = await taskService.updateTask(id, validatedBody);

    if (!updatedTask) {
        res.status(404).json({ message: 'Tarefa não encontrada para atualização.' });
        return;
    }
    res.status(200).json(updatedTask);
});

/**
 * @desc    Deletar uma tarefa
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido.' });
        return;
    }

    const success = await taskService.deleteTask(id);
    if (!success) {
        res.status(404).json({ message: 'Tarefa não encontrada para deletar.' });
        return;
    }
    res.status(204).send();
});