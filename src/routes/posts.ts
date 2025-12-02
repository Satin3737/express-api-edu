import {Router} from 'express';
import {Routes} from '@/interfaces';
import {validate} from '@/middlewares';
import {createPostSchema} from '@/schemas';
import {createPost, getPosts} from '@/controllers';

const postsRouter = Router();

postsRouter.get(Routes.posts, getPosts);
postsRouter.post(Routes.posts, validate(createPostSchema), createPost);

export default postsRouter;
