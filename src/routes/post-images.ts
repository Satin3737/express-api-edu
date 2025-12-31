import {Router} from 'express';
import {Routes} from '@/interfaces';
import {ImagesStorageDir} from '@/const';
import {fileUpload, validate} from '@/middlewares';
import {idParamsSchema} from '@/schemas';
import {createPostImage, getPostImage} from '@/controllers/post-image';

const postImagesRouter = Router();

postImagesRouter.get(Routes.postImageById, validate(idParamsSchema), getPostImage);
postImagesRouter.post(Routes.postImage, fileUpload(ImagesStorageDir).single('image'), createPostImage);

export default postImagesRouter;
