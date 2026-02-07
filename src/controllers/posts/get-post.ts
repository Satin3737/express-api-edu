import type {RequestHandler} from 'express';
import {Logger} from '@/services';
import type {IIdParams} from '@/schemas';
import {Post} from '@/models';

const getPost: RequestHandler<IIdParams['params']> = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();
        if (!post) return res.status(404).json({message: 'Post not found'});
        return res.status(200).json({message: 'Post retrieved successfully', post});
    } catch (error) {
        Logger.error(error, 'Error getting post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default getPost;
