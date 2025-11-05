import { Router } from 'express';
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController';

const taskRoutes = Router();

taskRoutes.route('/')
    .get(getAllTasks)
    .post(createTask);

taskRoutes.route('/:id')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);

export default taskRoutes;