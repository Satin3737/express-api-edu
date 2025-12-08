import type {ErrorRequestHandler} from 'express';
import {MaxBodySize, MaxUploadSize} from '@/const';

const bodyToLarge: ErrorRequestHandler = (err, _, res, next) => {
    if (err && (err.type === 'entity.too.large' || err.status === 413 || err.name === 'PayloadTooLargeError')) {
        return res.status(413).json({error: 'Payload too large', maxSize: MaxBodySize, maxUploadSize: MaxUploadSize});
    }

    next(err);
};

export default bodyToLarge;
