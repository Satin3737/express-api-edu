import {PaginationLimitDefault, PaginationPageDefault} from '@/const';
import {asyncHandler} from '@/utils';
import type {IPaginationQueries} from '@/schemas';
import {Post} from '@/models';

const getPosts = asyncHandler<unknown, unknown, unknown, IPaginationQueries['query']>(async (req, res) => {
    const {page = PaginationPageDefault, limit = PaginationLimitDefault} = req.query;
    const total = await Post.countDocuments();

    const posts = await Post.find()
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return res.status(200).json({message: 'Posts retrieved successfully', posts, total});
});

export default getPosts;
