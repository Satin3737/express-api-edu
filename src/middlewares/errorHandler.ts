import type {ErrorRequestHandler} from 'express';
import {IsDev} from '@/const';
import {Logger} from '@/services';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    Logger.error(err, 'Unhandled error');
    return res.status(500).json({
        message: 'Internal Server Error',
        ...(IsDev && {error: err.message, stack: err.stack})
    });
};

export default errorHandler;
