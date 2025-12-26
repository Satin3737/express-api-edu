import mongoose from 'mongoose';
import {Logger} from '@/services';

const database = process.env.MONGO_INITDB_DATABASE;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

if (!database || !host || !port) {
    Logger.error('Missing MongoDB environment variables');
    process.exit(1);
}

export const MongoUrl = `mongodb://${host}:${port}/${database}`;

export const connectToMongoServer = async () => {
    try {
        Logger.info('Connecting to MongoDB...');
        await mongoose.connect(MongoUrl);
    } catch (error) {
        Logger.error(error, 'Error connecting to MongoDB');
        throw error;
    }
};

export const disconnectFromMongoServer = async () => {
    try {
        Logger.info('Disconnecting from MongoDB...');
        await mongoose.disconnect();
    } catch (error) {
        Logger.error(error, 'Error disconnecting from MongoDB');
        throw error;
    }
};
