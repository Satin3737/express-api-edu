export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BASE_URL?: string;
            PORT?: string;
            DB_HOST?: string;
            DB_PORT?: string;
            MONGO_INITDB_DATABASE?: string;
            MONGO_INITDB_ROOT_USERNAME?: string;
            MONGO_INITDB_ROOT_PASSWORD?: string;
            JWT_SECRET?: string;
            JWT_EXPIRES_IN?: string;
        }
    }

    namespace Express {
        interface Request {
            userId: string;
        }
    }
}
