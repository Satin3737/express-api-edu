import type {RequestHandler} from 'express';
import {Logger} from '@/services';
import type {IDeletePost} from '@/schemas';
import {Post} from '@/models';

const deletePost: RequestHandler<IDeletePost['params']> = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        Logger.error(error, 'Error creating post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default deletePost;
