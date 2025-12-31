import {z} from 'zod';

const idSchema = z.string('Post ID must be a string').trim().min(1, 'Post ID is required');

export const idParamsSchema = z.object({
    params: z.object({
        id: idSchema
    })
});

export type IIdParams = z.infer<typeof idParamsSchema>;
