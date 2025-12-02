import {z} from 'zod';

export const idSchema = z.string('Post ID must be a string').trim().min(1, 'Post ID is required');

export const postSchema = z
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
        imageUrl: z.url('Invalid URL format for imageUrl'),
        author: z
            .string('Author name must be a string')
            .trim()
            .min(3, 'Author name must be at least 3 characters long')
            .max(50, 'Author name must be at most 50 characters long')
    })
    .strict();

export const createPostSchema = z.object({
    body: postSchema
});

export type ICreatePost = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
    body: postSchema.partial(),
    params: z.object({
        id: idSchema
    })
});

export type IUpdatePost = z.infer<typeof updatePostSchema>;

export const deletePostSchema = z.object({
    params: z.object({
        id: idSchema
    })
});

export type IDeletePost = z.infer<typeof deletePostSchema>;
