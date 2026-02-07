import type {RequestHandler} from 'express';
import {Logger} from '@/services';
import type {IUpdateUser} from '@/schemas';
import {User} from '@/models';

const updateUser: RequestHandler<unknown, unknown, IUpdateUser['body']> = async (req, res) => {
    try {
        const userId = req.userId;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true}).select('-password').lean();

        if (!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message: 'User updated successfully', user: updatedUser});
    } catch (error) {
        Logger.error(error, 'Error updating user');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default updateUser;
