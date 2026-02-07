import type {RequestHandler} from 'express';
import {Logger} from '@/services';
import {User} from '@/models';

const getUser: RequestHandler = async (req, res) => {
    try {
        const user = await User.findById(req.userId).lean();
        if (!user) return res.status(404).json({message: 'User not found'});
        return res.status(200).json({message: 'User retrieved successfully', user});
    } catch (error) {
        Logger.error(error, 'Error getting user');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default getUser;
