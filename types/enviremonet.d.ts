export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_PORT: number;
            DB_MONGO_URL: string;
            DB_JWT_SECRET: string;
        }   
    }
}