import bcrypt from 'bcryptjs';
import type {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import type {IJwtPayload} from '@/interfaces';
import {JwtExpiresIn, JwtSecret} from '@/const';
import {Logger} from '@/services';
import type {ILoginUser} from '@/schemas';
import {User} from '@/models';

const loginUser: RequestHandler<unknown, unknown, ILoginUser['body']> = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(401).json({message: 'User with this email does not exist'});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({message: 'Invalid password'});

        const payload: IJwtPayload = {email, userId: user._id.toString()};
        const token = jwt.sign(payload, JwtSecret, {expiresIn: JwtExpiresIn});

        return res.status(200).json({message: 'User logged in successfully', userId: user._id, token});
    } catch (error) {
        Logger.error(error, 'Error logging in user');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default loginUser;
