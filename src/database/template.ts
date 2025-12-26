import {connectToMongoServer, disconnectFromMongoServer} from '@/database/db';
import {Logger} from '@/services';

export async function up(): Promise<void> {
    try {
        await connectToMongoServer();

        // migration...

        await disconnectFromMongoServer();
    } catch (err) {
        Logger.error(err, 'Migration failed');
        throw err;
    }
}

export async function down(): Promise<void> {
    try {
        await connectToMongoServer();

        // rollback...

        await disconnectFromMongoServer();
    } catch (err) {
        Logger.error(err, 'Rollback failed');
        throw err;
    }
}
