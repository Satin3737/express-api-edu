import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type {IJwtPayload} from '@/interfaces';
import {JwtExpiresIn, JwtSecret} from '@/const';
import type {ILoginUser} from '@/schemas';
import {User} from '@/models';
import {asyncHandler} from '@/utils';

const loginUser = asyncHandler<unknown, unknown, ILoginUser['body']>(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).json({message: 'Invalid email or password'});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({message: 'Invalid email or password'});

    const payload: IJwtPayload = {email, userId: user._id.toString()};
    const token = jwt.sign(payload, JwtSecret, {expiresIn: JwtExpiresIn});

    return res.status(200).json({message: 'User logged in successfully', userId: user._id, token});
});

export default loginUser;