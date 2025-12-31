import mongoose from 'mongoose';
import {z} from 'zod';

const idSchema = z
    .string('Post ID must be a string')
    .trim()
    .min(1, 'Post ID is required')
    .refine(id => mongoose.Types.ObjectId.isValid(id), {message: 'Id must be a 24 character hex string'});

export const idParamsSchema = z.object({
    params: z.object({
        id: idSchema
    })
});

export type IIdParams = z.infer<typeof idParamsSchema>;
