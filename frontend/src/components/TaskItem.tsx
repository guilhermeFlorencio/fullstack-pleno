import React from 'react';
import { ListGroup, Button, Stack, Form, Badge } from 'react-bootstrap';
import type { Task } from '../types/task';
interface Props {
    task: Task;
    onToggleComplete: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    isProcessing: boolean; // Estado para desabilitar botões durante chamadas de API
}

const TaskItem: React.FC<Props> = ({ task, onToggleComplete, onDelete, isProcessing }) => {

    const handleToggle = () => {
        onToggleComplete(task.id, !task.completed);
    };

    const handleDelete = () => {
        onDelete(task.id);
    };

    return (
        <ListGroup.Item
            as="li"
            className={`d-flex justify-content-between align-items-start ${task.completed ? 'bg-light text-muted' : ''}`}
        >
            <Stack gap={2}>
                <Form.Check
                    type="checkbox"
                    id={`task-check-${task.id}`}
                    checked={task.completed}
                    onChange={handleToggle}
                    disabled={isProcessing}
                    // O 'label' do checkbox será o título da tarefa
                    label={
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
                    }
                />

                {task.description && (
                    <p className="mb-0 ms-4" style={{ fontSize: '0.9rem' }}>
                        {task.description}
                    </p>
                )}
            </Stack>

            <Stack direction="horizontal" gap={2}>
                <Badge bg={task.completed ? 'success' : 'warning'} pill>
                    {task.completed ? 'Concluída' : 'Pendente'}
                </Badge>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isProcessing}
                >
                    Excluir
                </Button>
            </Stack>
        </ListGroup.Item>
    );
};

export default TaskItem;