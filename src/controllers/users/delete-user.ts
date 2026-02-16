import {Post, User} from '@/models';
import {asyncHandler, deleteFile, getImagePath} from '@/utils';

const deleteUser = asyncHandler(async (req, res) => {
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
});

export default deleteUser;
