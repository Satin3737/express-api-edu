import type {RequestHandler} from 'express';
import {PaginationLimitDefault, PaginationPageDefault} from '@/const';
import {Logger} from '@/services';
import type {IPaginationQueries} from '@/schemas';
import {User} from '@/models';

const getUsers: RequestHandler<unknown, unknown, unknown, IPaginationQueries['query']> = async (req, res) => {
    try {
        const {page = PaginationPageDefault, limit = PaginationLimitDefault} = req.query;
        const total = await User.countDocuments();

        const users = await User.find()
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return res.status(200).json({message: 'Users retrieved successfully', users, total});
    } catch (error) {
        Logger.error(error, 'Error getting users');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default getUsers;
