import {Router} from 'express';
import {Routes} from '@/interfaces';
import {validate} from '@/middlewares';
import {createPostSchema, idParamsSchema, paginationQuerySchema, updatePostSchema} from '@/schemas';
import {createPost, deletePost, getPost, getPosts, updatePost} from '@/controllers/posts';

const postsRouter = Router();

postsRouter.get(Routes.posts, validate(paginationQuerySchema), getPosts);
postsRouter.get(Routes.postById, validate(idParamsSchema), getPost);
postsRouter.post(Routes.post, validate(createPostSchema), createPost);
postsRouter.patch(Routes.postById, validate(updatePostSchema), updatePost);
postsRouter.delete(Routes.postById, validate(idParamsSchema), deletePost);

export default postsRouter;
