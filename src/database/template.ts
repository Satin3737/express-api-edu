import {connectToMongoServer, disconnectFromMongoServer} from '@/database/db';
import {Logger} from '@/services';

export async function up(): Promise<void> {
    try {
        await connectToMongoServer();
        // migration...
    } catch (err) {
        Logger.error(err, 'Migration failed');
        throw err;
    } finally {
        await disconnectFromMongoServer();
    }
}

export async function down(): Promise<void> {
    try {
        await connectToMongoServer();
        // rollback...
    } catch (err) {
        Logger.error(err, 'Rollback failed');
        throw err;
    } finally {
        await disconnectFromMongoServer();
    }
}
