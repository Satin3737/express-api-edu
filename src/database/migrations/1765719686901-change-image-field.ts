import {connectToMongoServer, disconnectFromMongoServer} from '@/database/db';
import {Logger} from '@/services';
import {Post} from '@/models';

export async function up(): Promise<void> {
    try {
        await connectToMongoServer();

        const filter = {image: {$exists: false}, imageUrl: {$exists: true}};
        const count = await Post.countDocuments(filter);
        if (!count) return;
        await Post.updateMany(filter, [{$set: {image: '$imageUrl'}}, {$unset: 'imageUrl'}], {updatePipeline: true});

        await disconnectFromMongoServer();
    } catch (err) {
        Logger.error(err, 'Migration failed');
        throw err;
    }
}

export async function down(): Promise<void> {
    try {
        await connectToMongoServer();

        const filter = {image: {$exists: true}, imageUrl: {$exists: false}};
        const count = await Post.countDocuments(filter);
        if (!count) return;
        await Post.updateMany(filter, [{$set: {imageUrl: '$image'}}, {$unset: 'image'}], {updatePipeline: true});

        await disconnectFromMongoServer();
    } catch (err) {
        Logger.error(err, 'Rollback failed');
        throw err;
    }
}
