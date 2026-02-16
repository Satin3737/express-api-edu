import type {IUpdateUser} from '@/schemas';
import {User} from '@/models';
import {asyncHandler} from '@/utils';

const updateUser = asyncHandler<unknown, unknown, IUpdateUser['body']>(async (req, res) => {
    const userId = req.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true}).select('-password').lean();

    if (!updatedUser) return res.status(404).json({message: 'User not found'});

    return res.status(200).json({message: 'User updated successfully', user: updatedUser});
});

export default updateUser;
