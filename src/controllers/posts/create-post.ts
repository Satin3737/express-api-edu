import type {RequestHandler} from 'express';
import {Logger} from '@/services';
import type {ICreatePost} from '@/schemas';
import {Post, User} from '@/models';

const createPost: RequestHandler<unknown, unknown, ICreatePost['body']> = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: 'User not found'});

        const post = new Post({...req.body, author: user});
        user.posts.push(post._id);

        await user.save();
        await post.save();

        return res.status(201).json({message: 'Post created successfully', post});
    } catch (error) {
        Logger.error(error, 'Error creating post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default createPost;
