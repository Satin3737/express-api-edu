import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import {connectToMongoServer} from '@/database/db';
import {ImagesDir, ImagesStorageDir, Port} from '@/const';
import {Logger} from '@/services';
import {authRouter, notFoundRouter, postImagesRouter, postsRouter} from '@/routes';
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

const routes = [postsRouter, postImagesRouter, notFoundRouter];

app.use(middlewares);
app.use(`/${ImagesDir}`, express.static(ImagesStorageDir));
app.use('/api/v1', authRouter);
app.use('/api/v1', isAuth, routes);

try {
    await connectToMongoServer();
    app.listen(Port, () => Logger.info(`Server running on http://localhost:${Port}`));
} catch (error) {
    Logger.error(error, 'Failed to start server');
    process.exit(1);
}
