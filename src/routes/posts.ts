import {Router} from 'express';
import {Routes} from '@/interfaces';
import {validate} from '@/middlewares';
import {createPostSchema, deletePostSchema} from '@/schemas';
import {createPost, deletePost, getPosts} from '@/controllers';

const postsRouter = Router();

postsRouter.get(Routes.posts, getPosts);
postsRouter.post(Routes.post, validate(createPostSchema), createPost);
postsRouter.delete(Routes.postById, validate(deletePostSchema), deletePost);

export default postsRouter;
