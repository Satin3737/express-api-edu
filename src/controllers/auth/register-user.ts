import bcrypt from 'bcryptjs';
import {bcryptSalt} from '@/const';
import {asyncHandler} from '@/utils';
import type {ICreateUser} from '@/schemas';
import {User} from '@/models';

const registerUser = asyncHandler<unknown, unknown, ICreateUser['body']>(async (req, res) => {
    const {name, surname, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    const user = new User({email, password: hashedPassword, name, surname});
    await user.save();

    return res.status(201).json({message: 'User registered successfully', userId: user._id});
});

export default registerUser;
