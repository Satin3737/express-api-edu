import {PaginationLimitDefault, PaginationPageDefault} from '@/const';
import type {IPaginationQueries} from '@/schemas';
import {User} from '@/models';
import {asyncHandler} from '@/utils';

const getUsers = asyncHandler<unknown, unknown, unknown, IPaginationQueries['query']>(async (req, res) => {
    const {page = PaginationPageDefault, limit = PaginationLimitDefault} = req.query;
    const total = await User.countDocuments();

    const users = await User.find()
        .select('-password')
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return res.status(200).json({message: 'Users retrieved successfully', users, total});
});

export default getUsers;