import type {RequestHandler} from 'express';
import {type ZodObject, z} from 'zod';

const validate = (schema: ZodObject): RequestHandler => {
    return (req, res, next) => {
        try {
            const {success, error} = schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params
            });

            if (!success) {
                return res.status(422).json({
                    message: 'Validation failed',
                    validation: z.treeifyError(error)
                });
            }

            next();
        } catch (error: unknown) {
            return res.status(500).json({message: 'Internal Server Error', error});
        }
    };
};

export default validate;
