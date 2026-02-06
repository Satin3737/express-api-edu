import type {IValueOf} from '@/interfaces';

export const Routes = {
    register: '/auth/register',
    login: '/auth/login',
    user: '/user',
    posts: '/posts',
    post: '/post',
    postById: '/post/:id',
    postImage: '/post-image',
    postImageById: '/post-image/:id'
} as const;

export type IRoute = IValueOf<typeof Routes>;

export const Models = {
    user: 'User',
    post: 'Post',
    postImage: 'PostImage'
} as const;

export type IModels = IValueOf<typeof Models>;
