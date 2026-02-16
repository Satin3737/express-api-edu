import type {IIdParams} from '@/schemas';
import {Post} from '@/models';
import {asyncHandler} from '@/utils';

const getPost = asyncHandler<IIdParams['params']>(async (req, res) => {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).json({message: 'Post not found'});
    return res.status(200).json({message: 'Post retrieved successfully', post});
});

export default getPost;
