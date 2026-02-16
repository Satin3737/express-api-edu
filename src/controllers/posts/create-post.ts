import {SocketEvents} from '@/interfaces';
import {asyncHandler} from '@/utils';
import {Socket} from '@/services';
import type {ICreatePost} from '@/schemas';
import {Post, User} from '@/models';

const createPost = asyncHandler<unknown, unknown, ICreatePost['body']>(async (req, res) => {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({message: 'User not found'});

    const post = new Post({...req.body, author: user});
    user.posts.push(post._id);

    await user.save();
    await post.save();

    Socket.ioPosts.emit(SocketEvents.postAdded, post);

    return res.status(201).json({message: 'Post created successfully', post});
});

export default createPost;
