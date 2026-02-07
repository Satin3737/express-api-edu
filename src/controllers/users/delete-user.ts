import type {RequestHandler} from 'express';
import {deleteFile, getImagePath} from '@/utils';
import {Logger} from '@/services';
import {Post, User} from '@/models';

const deleteUser: RequestHandler = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: 'User not found'});

        const posts = await Post.find({_id: {$in: user.posts}}).lean();

        for (const post of posts) {
            await deleteFile(getImagePath(post.image));
        }

        await Post.deleteMany({_id: {$in: user.posts}});
        await user.deleteOne();

        return res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        Logger.error(error, 'Error deleting user');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default deleteUser;
