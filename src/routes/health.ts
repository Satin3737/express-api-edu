import {Router} from 'express';
import mongoose from 'mongoose';

const healthRouter = Router();

healthRouter.get('/health', (_, res) => {
    const dbReady = mongoose.connection.readyState === 1;
    const status = dbReady ? 200 : 503;
    return res.status(status).json({
        status: dbReady ? 'ok' : 'unavailable',
        db: dbReady ? 'connected' : 'disconnected'
    });
});

export default healthRouter;
