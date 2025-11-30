declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BASE_URL: string;
            PORT: number;
            DB_HOST: string;
            DB_PORT: number;
            MONGO_INITDB_DATABASE: string;
            MONGO_INITDB_ROOT_USERNAME: string;
            MONGO_INITDB_ROOT_PASSWORD: string;
        }
    }
}
