import {Router} from 'express';
import {Routes} from '@/interfaces';
import {validate} from '@/middlewares';
import {updateUserSchema} from '@/schemas';
import {updateUser} from '@/controllers/auth';

const userRouter = Router();

userRouter.patch(Routes.user, validate(updateUserSchema), updateUser);

export default userRouter;
