import type {RequestHandler} from 'express';
import {Logger} from '@/services';
import type {IGetPost} from '@/schemas';
import {Post} from '@/models';

const getPost: RequestHandler<IGetPost['params']> = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();

        return res.status(200).json({
            message: 'Posts retrieved successfully',
            post
        });
    } catch (error) {
        Logger.error(error, 'Error getting posts');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default getPost;
