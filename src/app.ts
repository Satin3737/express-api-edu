import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import initializeMongoServer from '@/database/db';
import {ImagesDir, ImagesStorageDir, MaxBodySize, Port} from '@/const';
import {Logger} from '@/services';
import {notFoundRouter, postsRouter} from '@/routes';
import {bodyToLarge} from '@/middlewares';

const app = express();

app.set('title', 'ExpressApi');

const middlewares = [
    cors(),
    express.urlencoded({extended: true}),
    express.json({limit: MaxBodySize}),
    bodyToLarge,
    pinoHttp({logger: Logger.instance, autoLogging: false})
];

const routes = [postsRouter, notFoundRouter];

app.use(`/${ImagesDir}`, express.static(ImagesStorageDir));
app.use([...middlewares, ...routes]);

try {
    await initializeMongoServer();
    app.listen(Port, () => Logger.info(`Server running on http://localhost:${Port}`));
} catch (error) {
    Logger.error(error, 'Failed to start server');
    process.exit(1);
}
