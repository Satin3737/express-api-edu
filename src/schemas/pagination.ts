import {z} from 'zod';
import {PaginationLimitMax, PaginationPageDefault} from '@/const';

export const paginationQuerySchema = z.object({
    query: z.object({
        page: z.coerce.number().min(PaginationPageDefault, `Page must be at least ${PaginationPageDefault}`).optional(),
        limit: z.coerce
            .number()
            .min(PaginationPageDefault, `Limit must be at least ${PaginationPageDefault}`)
            .max(PaginationLimitMax, `Limit cannot exceed ${PaginationLimitMax}`)
            .optional()
    })
});

export type IPaginationQueries = z.infer<typeof paginationQuerySchema>;
