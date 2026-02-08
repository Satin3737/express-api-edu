import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import {connectToMongoServer} from '@/database/db';
import {ImagesDir, ImagesStorageDir, Port} from '@/const';
import {Logger, Socket} from '@/services';
import {authRouter, notFoundRouter, postImagesRouter, postsRouter, userRouter} from '@/routes';
import {bodyToLarge, isAuth} from '@/middlewares';

const app = express();

app.set('title', 'ExpressApi');

const middlewares = [
    cors(),
    express.urlencoded({extended: true}),
    express.json(),
    pinoHttp({logger: Logger.instance, autoLogging: false}),
    bodyToLarge
];

const routes = [userRouter, postsRouter, postImagesRouter, notFoundRouter];

app.use(middlewares);
app.use(`/${ImagesDir}`, express.static(ImagesStorageDir));
app.use('/api/v1', authRouter);
app.use('/api/v1', isAuth, routes);

try {
    await connectToMongoServer();
    const server = app.listen(Port, () => Logger.info(`Server running on http://localhost:${Port}`));
    Socket.init(server);
} catch (error) {
    Logger.error(error, 'Failed to start server');
    process.exit(1);
}
