import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

function App() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/hello') // Graças ao proxy, isso vai para localhost:3000
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setMessage('Erro ao conectar com o backend');
                setLoading(false);
            });
    }, []);

    return (
        <Container className="mt-5">
            <h1>Desafio To-Do List</h1>
            {loading ? <Spinner /> : <p>{message}</p>}
        </Container>
    );
}

export default App;