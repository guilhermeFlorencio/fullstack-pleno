import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`[ERRO] ${err.stack}`);

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: 'Erro de validação nos dados enviados.',
            errors: err.errors.map(e => ({ path: e.path, message: e.message })),
        });
    }

    if (res.statusCode !== 200) {
        if (res.headersSent) {
            return;
        }
    }

    return res.status(500).json({
        message: 'Erro interno do servidor.',
        error: err.message,
    });
};