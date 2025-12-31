import type {RequestHandler} from 'express';
import path from 'path';
import {ImagesStorageDir} from '@/const';
import {deleteFile} from '@/utils';
import {Logger} from '@/services';
import type {IIdParams} from '@/schemas';
import {Post} from '@/models';

const deletePost: RequestHandler<IIdParams['params']> = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) return res.status(404).json({message: 'Post not found'});

        const imageName = post.image.split('/').pop();
        if (imageName) await deleteFile(path.join(ImagesStorageDir, imageName));

        return res.status(200).json({message: 'Post deleted successfully'});
    } catch (error) {
        Logger.error(error, 'Error deleting post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default deletePost;
