import {z} from 'zod';
import {isEmailUnique} from '@/utils';

const passwordSchema = z
    .string('Password must be a string')
    .trim()
    .min(6, 'Password must be at least 6 characters long')
    .max(18, 'Password must be at most 18 characters long')
    .nonempty('Password is required');

const bodySchema = z
    .object({
        email: z.email('Invalid email address').trim(),
        name: z.string('Name must be a string').trim().nonempty('Name is required'),
        surname: z.string('Surname must be a string').trim().nonempty('Surname is required'),
        password: passwordSchema,
        confirmPassword: passwordSchema
    })
    .strict();

const userBodySchema = z.object({
    body: bodySchema
        .refine(data => data.password === data.confirmPassword, {
            error: 'Passwords do not match',
            path: ['confirmPassword']
        })
        .refine(async ({email}) => isEmailUnique(email), {
            error: 'Email is already in use',
            path: ['email']
        })
        .strict()
});

export const createUserSchema = userBodySchema;
export type ICreateUser = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
    body: bodySchema.pick({email: true, password: true})
});

export type ILoginUser = z.infer<typeof loginUserSchema>;

export const updateUserSchema = z.object({
    body: bodySchema
        .pick({email: true, name: true, surname: true})
        .partial()
        .refine(async ({email}) => isEmailUnique(email), {
            error: 'Email is already in use',
            path: ['email']
        })
});

export type IUpdateUser = z.infer<typeof updateUserSchema>;
