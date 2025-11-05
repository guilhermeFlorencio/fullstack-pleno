import express from 'express';
import 'dotenv/config';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';
import { getDbConnection } from './database';

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await getDbConnection();
        console.log('[Servidor] Conexão com o banco de dados verificada.');
    } catch (error) {
        console.error('[Servidor] FALHA ao conectar com o banco de dados.');
        console.error(error);
        process.exit(1);
    }

    const app = express();

    app.use(express.json()); // Permite que o app entenda JSON no body

    app.get('/api/health', (req, res) => {
        res.json({ status: 'UP', message: 'API está operacional.' });
    });

    app.use('/api/tasks', taskRoutes);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`[Servidor] Backend rodando na porta ${PORT}`);
    });
}

startServer();