import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Backend!' });
});

app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});