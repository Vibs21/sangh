import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv'
dotenv.config();

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // Default status is 500 if not set
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error for internal monitoring
    console.error(err);

    // Send error response
    res.status(statusCode).json({
        error: {
            message,
            status: statusCode,
            // You can add more details in development mode
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        }
    });
}

export default errorHandler;
