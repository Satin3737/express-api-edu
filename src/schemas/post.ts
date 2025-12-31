import {z} from 'zod';
import {idParamsSchema} from '@/schemas';

const postBodySchema = z.object({
    body: z
        .object({
            title: z
                .string('Title must be a string')
                .trim()
                .min(3, 'Title must be at least 3 characters long')
                .max(100, 'Title must be at most 100 characters long'),
            description: z
                .string('Description must be a string')
                .trim()
                .min(10, 'Description must be at least 10 characters long')
                .max(1000, 'Description must be at most 1000 characters long'),
            image: z.url('Image must be a valid URL'),
            author: z
                .string('Author name must be a string')
                .trim()
                .min(3, 'Author name must be at least 3 characters long')
                .max(50, 'Author name must be at most 50 characters long')
        })
        .strict()
});

export const createPostSchema = postBodySchema;
export type ICreatePost = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
    body: postBodySchema.shape.body.partial(),
    ...idParamsSchema.shape
});

export type IUpdatePost = z.infer<typeof updatePostSchema>;
