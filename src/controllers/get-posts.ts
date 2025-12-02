import type {RequestHandler} from 'express';
import {Logger} from '@/services';
import {Post} from '@/models';

const getPosts: RequestHandler = async (_, res) => {
    try {
        const posts = await Post.find();

        return res.status(200).json({
            message: 'Posts retrieved successfully',
            posts
        });
    } catch (error) {
        Logger.error(error, 'Error getting posts');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default getPosts;
