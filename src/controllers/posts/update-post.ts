import {SocketEvents} from '@/interfaces';
import {asyncHandler, deleteFile, getImagePath} from '@/utils';
import {Socket} from '@/services';
import type {IUpdatePost} from '@/schemas';
import {type IPost, Post} from '@/models';

const updatePost = asyncHandler<IUpdatePost['params'], unknown, IUpdatePost['body']>(async (req, res) => {
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
});

export default updatePost;
