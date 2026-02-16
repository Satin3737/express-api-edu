import type {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import {z} from 'zod';
import type {IJwtPayload} from '@/interfaces';
import {JwtSecret} from '@/const';
import {Logger} from '@/services';
import {jwtSchema} from '@/schemas';
import {User} from '@/models';

const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const token = req.get('Authorization')?.replace('Bearer ', '');
        const {success, data, error} = jwtSchema.safeParse({token});

        if (!success) {
            return res.status(401).json({
                message: 'Unauthorized',
                validation: z.flattenError(error).fieldErrors
            });
        }

        try {
            const decodedToken = jwt.verify(data.token, JwtSecret);
            if (!decodedToken) return res.status(401).json({message: 'Unauthorized'});

            const userId = (decodedToken as IJwtPayload).userId;
            const userExists = await User.findById(userId, {_id: true}).lean();
            if (!userExists) return res.status(401).json({message: 'Unauthorized'});

            req.userId = userId;
            next();
        } catch (error: unknown) {
            Logger.error(error, 'JWT verification failed');
            return res.status(401).json({message: 'Unauthorized'});
        }
    } catch (error: unknown) {
        Logger.error(error, 'Auth middleware error');
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

export default isAuth;
