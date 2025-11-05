import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import * as api from './services/api';
import type { Task, CreateTaskData } from './types/task';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ErrorAlert from './components/ErrorAlert';


function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [processingTaskId, setProcessingTaskId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setError('');
                setIsLoading(true);
                const fetchedTasks = await api.getTasks();
                setTasks(fetchedTasks);
            } catch (err) {
                console.error('Erro ao buscar tarefas:', err);
                setError('Não foi possível carregar a lista de tarefas. Tente recarregar a página.');
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleCreateTask = async (taskData: CreateTaskData) => {
        try {
            setError('');
            setIsSubmitting(true);
            const newTask = await api.createTask(taskData);

            setTasks(prevTasks => [newTask, ...prevTasks]);

        } catch (err) {
            console.error('Erro ao criar tarefa:', err);
            setError('Falha ao criar a tarefa. Verifique o formulário ou sua conexão.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleComplete = async (id: number, completed: boolean) => {
        try {
            setError('');
            setProcessingTaskId(id);
            const updatedTask = await api.updateTask(id, { completed });

            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === id ? updatedTask : task))
            );

        } catch (err) {
            console.error('Erro ao atualizar tarefa:', err);
            setError('Não foi possível atualizar o status da tarefa.');
        } finally {
            setProcessingTaskId(null);
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
            return;
        }

        try {
            setError('');
            setProcessingTaskId(id);
            await api.deleteTask(id);

            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

        } catch (err) {
            console.error('Erro ao deletar tarefa:', err);
            setError('Não foi possível excluir a tarefa.');
        } finally {
            setProcessingTaskId(null);
        }
    };


    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Carregando tarefas...</span>
                    </Spinner>
                </div>
            );
        }

        if (error && !isLoading) {
            return <ErrorAlert message={error} onClose={() => setError('')} />;
        }

        return (
            <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                processingTaskId={processingTaskId}
            />
        );
    };

    return (
        <Container className="my-5">
            <Row>
                <Col xs={12} md={10} lg={8} className="mx-auto">
                    <header className="text-center mb-4">
                        <h1 className="display-4">Sistema de Tarefas</h1>
                    </header>

                    <main>
                        <TaskForm
                            onSubmit={handleCreateTask}
                            isSubmitting={isSubmitting}
                        />

                        <hr className="my-4" />

                        {renderContent()}
                    </main>
                </Col>
            </Row>
        </Container>
    );
}

export default App;