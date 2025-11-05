import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
    message: string;
    onClose?: () => void;
}

const ErrorAlert: React.FC<Props> = ({ message, onClose }) => {
    if (!message) {
        return null;
    }

    return (
        <Alert
            variant="danger"
            onClose={onClose}
            dismissible={!!onClose}
            className="mt-3"
        >
            <Alert.Heading>Ocorreu um Erro</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
};

export default ErrorAlert;