import bcrypt from 'bcryptjs';
import type {RequestHandler} from 'express';
import {bcryptSalt} from '@/const';
import {Logger} from '@/services';
import type {ICreateUser} from '@/schemas';
import {User} from '@/models';

const registerUser: RequestHandler<ICreateUser['body']> = async (req, res) => {
    try {
        const {name, surname, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        const user = new User({email, password: hashedPassword, name, surname});
        await user.save();

        return res.status(201).json({message: 'User registered successfully', userId: user._id});
    } catch (error) {
        Logger.error(error, 'Error registering user');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default registerUser;
