import type {IValueOf} from '@/interfaces';

export const Routes = {
    posts: '/posts',
    post: '/post',
    postById: '/post/:id'
} as const;

export type IRoute = IValueOf<typeof Routes>;

export const Models = {
    post: 'Post'
} as const;

export type IModels = IValueOf<typeof Models>;
