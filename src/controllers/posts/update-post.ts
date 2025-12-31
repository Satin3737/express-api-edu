import type {RequestHandler} from 'express';
import path from 'path';
import {ImagesStorageDir} from '@/const';
import {deleteFile} from '@/utils';
import {Logger} from '@/services';
import type {IUpdatePost} from '@/schemas';
import {type IPost, Post} from '@/models';

const updatePost: RequestHandler<IUpdatePost['params'], unknown, IUpdatePost['body']> = async (req, res) => {
    try {
        const {id} = req.params;
        let post: IPost;
        const isNewImage = 'image' in req.body;

        if (isNewImage) {
            const oldPost = await Post.findById(id);
            if (!oldPost) return res.status(404).json({message: 'Post not found'});

            const imageName = oldPost.image.split('/').pop();
            if (imageName) await deleteFile(path.join(ImagesStorageDir, imageName));

            await Object.assign(oldPost, req.body).save();
            post = oldPost.toObject();
        } else {
            const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true}).lean();
            if (!updatedPost) return res.status(404).json({message: 'Post not found'});
            post = updatedPost;
        }

        return res.status(201).json({message: 'Post updated successfully', post});
    } catch (error) {
        Logger.error(error, 'Error updating post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default updatePost;
