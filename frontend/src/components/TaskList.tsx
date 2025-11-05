import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface Props {
    tasks: Task[];
    onToggleComplete: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    processingTaskId: number | null;
}

const TaskList: React.FC<Props> = ({ tasks, onToggleComplete, onDelete, processingTaskId }) => {

    if (tasks.length === 0) {
        return (
            <Alert variant="info" className="text-center">
            Nenhuma tarefa encontrada. Adicione uma nova tarefa acima!
        </Alert>
    );
    }

    return (
        <ListGroup as="ul" className="shadow-sm">
        {tasks.map(task => (
                <TaskItem
                    key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            isProcessing={processingTaskId === task.id}
    />
))}
    </ListGroup>
);
};

export default TaskList;