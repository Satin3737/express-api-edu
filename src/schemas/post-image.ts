import {z} from 'zod';

export const postImageSchema = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string().refine(type => type.startsWith('image/'), 'Invalid image file')
});

export type IPostImage = z.infer<typeof postImageSchema>;
