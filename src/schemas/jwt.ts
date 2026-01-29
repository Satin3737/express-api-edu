import {z} from 'zod';

export const jwtSchema = z.object({
    token: z.jwt('Invalid JWT token')
});

export type IJwt = z.infer<typeof jwtSchema>;
