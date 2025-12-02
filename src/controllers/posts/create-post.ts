import type {RequestHandler} from 'express';
import {Logger} from '@/services';
import type {ICreatePost} from '@/schemas';
import {Post} from '@/models';

const createPost: RequestHandler<unknown, unknown, ICreatePost['body']> = async (req, res) => {
    try {
        const post = await new Post(req.body).save();

        return res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        Logger.error(error, 'Error creating post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default createPost;
