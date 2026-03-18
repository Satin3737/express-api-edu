import type {ErrorRequestHandler} from 'express';
import fs from 'fs';
import {Logger} from '@/services';

const cleanupUpload: ErrorRequestHandler = (err, req, _, next) => {
    if (req.file) {
        fs.promises.unlink(req.file.path).catch(unlinkErr => {
            Logger.error(unlinkErr, 'Failed to cleanup uploaded file');
        });
    }
    next(err);
};

export default cleanupUpload;
