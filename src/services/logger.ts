import dayjs from 'dayjs';
import pino from 'pino';

class Logger {
    public readonly instance: pino.Logger;

    constructor() {
        this.instance = pino({
            transport: {target: 'pino-pretty', options: {colorize: true}},
            base: {pid: false},
            timestamp: () => `,"time":"${dayjs().format('DD/MM/YYYY HH:mm:ss')}"`
        });
    }

    public info(data: unknown): void {
        this.instance.info(data);
    }

    public error(error: unknown, message?: string): void {
        this.instance.error(error, message);
    }
}

export default new Logger();
