import {connectToMongoServer, disconnectFromMongoServer} from '@/database/db';
import {Logger} from '@/services';
import {Post} from '@/models';

export async function up(): Promise<void> {
    try {
        await connectToMongoServer();

        await Post.updateMany(
            {
                image: {$type: 'string', $regex: /\/images\/post_/}
            },
            [
                {
                    $set: {
                        image: {
                            $replaceOne: {input: '$image', find: '/images/post_', replacement: '/images/'}
                        }
                    }
                }
            ],
            {updatePipeline: true}
        );
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

        await Post.updateMany(
            {
                $and: [{image: {$type: 'string'}}, {image: {$regex: /\/images\//}}, {image: {$not: /\/images\/post_/}}]
            },
            [
                {
                    $set: {
                        image: {
                            $replaceOne: {input: '$image', find: '/images/', replacement: '/images/post_'}
                        }
                    }
                }
            ],
            {updatePipeline: true}
        );
    } catch (err) {
        Logger.error(err, 'Rollback failed');
        throw err;
    } finally {
        await disconnectFromMongoServer();
    }
}
