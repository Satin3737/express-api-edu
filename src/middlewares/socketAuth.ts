import jwt from 'jsonwebtoken';
import type {Socket} from 'socket.io';
import type {IJwtPayload} from '@/interfaces';
import {JwtSecret} from '@/const';

const socketAuth = (socket: Socket, next: (err?: Error) => void): void => {
    const token = socket.handshake.headers.authorization;
    if (!token) return next(new Error('Authentication required'));

    try {
        const decoded = jwt.verify(token, JwtSecret) as IJwtPayload;
        socket.data.userId = decoded.userId;
        next();
    } catch {
        next(new Error('Invalid token'));
    }
};

export default socketAuth;
