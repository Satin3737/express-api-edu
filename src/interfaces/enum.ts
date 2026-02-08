import type {IValueOf} from '@/interfaces';

export const Routes = {
    register: '/auth/register',
    login: '/auth/login',
    users: '/users',
    user: '/user',
    posts: '/posts',
    post: '/post',
    postById: '/post/:id',
    postImage: '/post-image',
    postImageById: '/post-image/:id'
} as const;

export type IRoutes = IValueOf<typeof Routes>;

export const SocketNamespaces = {
    posts: '/posts'
} as const;

export type ISocketNamespaces = IValueOf<typeof SocketNamespaces>;

export const SocketEvents = {
    postAdded: 'postAdded',
    postUpdated: 'postUpdated',
    postDeleted: 'postDeleted'
} as const;

export type ISocketEvents = IValueOf<typeof SocketEvents>;

export const Models = {
    user: 'User',
    post: 'Post',
    postImage: 'PostImage'
} as const;

export type IModels = IValueOf<typeof Models>;
