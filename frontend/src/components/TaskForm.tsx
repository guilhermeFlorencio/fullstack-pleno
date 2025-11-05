import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Button, Stack } from 'react-bootstrap';
import type { CreateTaskData } from '../types/task';

const taskFormSchema = z.object({
    title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres.'),
    description: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

interface Props {
    onSubmit: (data: CreateTaskData) => Promise<void>;
    isSubmitting: boolean;
}

const TaskForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskFormSchema), // Integra o zod com o hook-form
    });

    const handleFormSubmit = async (data: TaskFormData) => {
        await onSubmit(data);
        reset();
    };

    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)} className="mb-4 p-4 border rounded bg-light">
            <Stack gap={3}>
                <Form.Group controlId="taskTitle">
                    <Form.Label>Título da Tarefa</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: Fazer compras"
                        {...register('title')}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="taskDescription">
                    <Form.Label>Descrição (Opcional)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Ex: Comprar leite e ovos"
                        {...register('description')}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adicionando...' : 'Adicionar Tarefa'}
                </Button>
            </Stack>
        </Form>
    );
};

export default TaskForm;