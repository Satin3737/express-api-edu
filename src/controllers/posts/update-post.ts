import type {RequestHandler} from 'express';
import {SocketEvents} from '@/interfaces';
import {deleteFile, getImagePath} from '@/utils';
import {Logger, Socket} from '@/services';
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
            if (oldPost.author.toString() !== req.userId) return res.status(403).json({message: 'Forbidden'});

            const oldImagePath = getImagePath(oldPost.image);
            await Object.assign(oldPost, req.body).save();
            await deleteFile(oldImagePath);

            post = oldPost.toObject();
        } else {
            const existingPost = await Post.findById(id);
            if (!existingPost) return res.status(404).json({message: 'Post not found'});
            if (existingPost.author.toString() !== req.userId) return res.status(403).json({message: 'Forbidden'});

            const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true}).lean();
            if (!updatedPost) return res.status(404).json({message: 'Post not found'});
            post = updatedPost;
        }

        Socket.ioPosts.emit(SocketEvents.postUpdated, post);

        return res.status(200).json({message: 'Post updated successfully', post});
    } catch (error) {
        Logger.error(error, 'Error updating post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default updatePost;
