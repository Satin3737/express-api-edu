import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import initializeMongoServer from '@/database/db';
import {Port} from '@/const';
import {Logger} from '@/services';
import {notFoundRouter, postsRouter} from '@/routes';

const app = express();

app.set('title', 'ExpressApi');

const middlewares = [
    cors(),
    express.json(),
    express.urlencoded({extended: true}),
    pinoHttp({logger: Logger.instance, autoLogging: false})
];

const routes = [postsRouter, notFoundRouter];

app.use([...middlewares, ...routes]);

try {
    await initializeMongoServer();
    app.listen(Port, () => Logger.info(`Server running on http://localhost:${Port}`));
} catch (error) {
    Logger.error(error, 'Failed to start server');
    process.exit(1);
}
