import type {Server as HttpServer} from 'http';
import {Namespace, Server} from 'socket.io';
import {SocketNamespaces} from '@/interfaces';
import {Logger} from '@/services';

class Socket {
    private static instance: Socket;
    private readonly server: Server;

    private constructor(httpServer: HttpServer) {
        this.server = new Server(httpServer, {cors: {origin: '*'}});
        this.listenErrors(this.server);
    }

    public static init(httpServer: HttpServer): Socket {
        if (!this.instance) {
            this.instance = new Socket(httpServer);
        }
        return this.instance;
    }

    public static get io(): Server {
        if (!this.instance) throw new Error('Socket.io is not initialized');
        return this.instance.server;
    }

    public static get ioPosts(): Namespace {
        return this.io.of(SocketNamespaces.posts);
    }

    private listenErrors(io: Server): void {
        io.engine.on('connection_error', err => {
            Logger.error(err, 'Socket connection error');
        });
    }
}

export default Socket;
