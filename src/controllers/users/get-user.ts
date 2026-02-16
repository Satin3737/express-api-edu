import {User} from '@/models';
import {asyncHandler} from '@/utils';

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).select('-password').lean();
    if (!user) return res.status(404).json({message: 'User not found'});
    return res.status(200).json({message: 'User retrieved successfully', user});
});

export default getUser;
