import type {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import {z} from 'zod';
import type {IJwtPayload} from '@/interfaces';
import {JwtSecret} from '@/const';
import {jwtSchema} from '@/schemas';

const isAuth: RequestHandler = (req, res, next) => {
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
            req.userId = (decodedToken as IJwtPayload).userId;
            next();
        } catch (error: unknown) {
            return res.status(401).json({message: 'Unauthorized', error});
        }
    } catch (error: unknown) {
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default isAuth;
