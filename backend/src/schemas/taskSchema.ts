import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'O título é obrigatório.',
        invalid_type_error: 'O título deve ser um texto.',
    }).min(3, { message: 'O título deve ter no mínimo 3 caracteres.' }),
    description: z.string({
        invalid_type_error: 'A descrição deve ser um texto.',
    }).optional(),
});


export const updateTaskSchema = z.object({
    title: z.string().min(3, { message: 'O título deve ter no mínimo 3 caracteres.' }).optional(),
    description: z.string().nullable().optional(),
    completed: z.boolean().optional(),
});