import type {RequestHandler} from 'express';
import {SocketEvents} from '@/interfaces';
import {deleteFile, getImagePath} from '@/utils';
import {Logger, Socket} from '@/services';
import type {IIdParams} from '@/schemas';
import {Post, User} from '@/models';

const deletePost: RequestHandler<IIdParams['params']> = async (req, res) => {
    try {
        const {id} = req.params;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({message: 'Post not found'});
        if (post.author.toString() !== req.userId) return res.status(403).json({message: 'Forbidden'});

        await Post.findByIdAndDelete(id);
        await User.findByIdAndUpdate(post.author, {$pull: {posts: post._id}});
        await deleteFile(getImagePath(post.image));

        Socket.ioPosts.emit(SocketEvents.postDeleted, post._id);

        return res.status(200).json({message: 'Post deleted successfully'});
    } catch (error) {
        Logger.error(error, 'Error deleting post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default deletePost;
