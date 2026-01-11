import type {RequestHandler} from 'express';
import {PaginationLimitDefault, PaginationPageDefault} from '@/const';
import {Logger} from '@/services';
import type {IPaginationQueries} from '@/schemas';
import {Post} from '@/models';

const getPosts: RequestHandler<unknown, unknown, unknown, IPaginationQueries['query']> = async (req, res) => {
    try {
        const {page = PaginationPageDefault, limit = PaginationLimitDefault} = req.query;
        const total = await Post.countDocuments();

        const posts = await Post.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return res.status(200).json({message: 'Posts retrieved successfully', posts, total});
    } catch (error) {
        Logger.error(error, 'Error getting posts');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default getPosts;
