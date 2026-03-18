import {SocketEvents} from '@/interfaces';
import {asyncHandler, deleteFile, getImagePath} from '@/utils';
import {Socket} from '@/services';
import type {IUpdatePost} from '@/schemas';
import {Post} from '@/models';

const updatePost = asyncHandler<IUpdatePost['params'], unknown, IUpdatePost['body']>(async (req, res) => {
    const {id} = req.params;

    const existingPost = await Post.findById(id);
    if (!existingPost) return res.status(404).json({message: 'Post not found'});
    if (existingPost.author.toString() !== req.userId) return res.status(403).json({message: 'Forbidden'});

    const oldImagePath = 'image' in req.body ? getImagePath(existingPost.image) : null;

    Object.assign(existingPost, req.body);
    await existingPost.save();

    if (oldImagePath) await deleteFile(oldImagePath);

    const post = existingPost.toObject();
    Socket.ioPosts.emit(SocketEvents.postUpdated, post);

    return res.status(200).json({message: 'Post updated successfully', post});
});

export default updatePost;
