import type {AnyBulkWriteOperation} from 'mongoose';
import {connectToMongoServer, disconnectFromMongoServer} from '@/database/db';
import {Logger} from '@/services';
import {type IPost, type IUser, Post, User} from '@/models';

export async function up(): Promise<void> {
    try {
        await connectToMongoServer();

        const posts = await Post.find({author: {$type: 'string'}})
            .select('_id author')
            .lean();

        if (!posts.length) return;

        const postBulkOps: AnyBulkWriteOperation<IPost>[] = [];
        const userBulkOps: AnyBulkWriteOperation<IUser>[] = [];

        const fallbackUser = await User.findOne({name: 'Main', surname: 'Editor'}).select('_id').lean();

        for (const post of posts) {
            const [name, surname] = post.author.toString().split(' ');
            const user = await User.findOne({name, surname});

            if (user) {
                postBulkOps.push({
                    updateOne: {
                        filter: {_id: post._id},
                        update: {$set: {author: user._id}}
                    }
                });

                userBulkOps.push({
                    updateOne: {
                        filter: {_id: user._id},
                        update: {$addToSet: {posts: post._id}}
                    }
                });
            } else {
                if (!fallbackUser) continue;
                postBulkOps.push({
                    updateOne: {
                        filter: {_id: post._id},
                        update: {$set: {author: fallbackUser._id}}
                    }
                });

                userBulkOps.push({
                    updateOne: {
                        filter: {_id: fallbackUser._id},
                        update: {$addToSet: {posts: post._id}}
                    }
                });
            }
        }

        if (postBulkOps.length) await Post.bulkWrite(postBulkOps);
        if (userBulkOps.length) await User.bulkWrite(userBulkOps);
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

        const posts = await Post.find({author: {$type: 'objectId'}})
            .select('_id author')
            .lean();

        if (!posts.length) return;

        const postBulkOps: AnyBulkWriteOperation<Omit<IPost, 'author'> & {author: string}>[] = [];
        const userBulkOps: AnyBulkWriteOperation<IUser>[] = [];

        for (const post of posts) {
            let authorString = 'Unknown Author';
            const user = await User.findById(post.author).select('_id name surname').lean();

            if (user) {
                authorString = `${user.name ?? ''} ${user.surname ?? ''}`.trim();

                userBulkOps.push({
                    updateOne: {
                        filter: {_id: user._id},
                        update: {$pull: {posts: post._id}}
                    }
                });
            }

            postBulkOps.push({
                updateOne: {
                    filter: {_id: post._id},
                    update: {$set: {author: authorString}}
                }
            });
        }

        if (postBulkOps.length) await Post.bulkWrite(postBulkOps);
        if (userBulkOps.length) await User.bulkWrite(userBulkOps);
    } catch (err) {
        Logger.error(err, 'Rollback failed');
        throw err;
    } finally {
        await disconnectFromMongoServer();
    }
}
