import {Router} from 'express';
import {Routes} from '@/interfaces';
import {validate} from '@/middlewares';
import {createUserSchema, loginUserSchema} from '@/schemas';
import {loginUser, registerUser} from '@/controllers/auth';

const authRouter = Router();

authRouter.post(Routes.register, validate(createUserSchema), registerUser);
authRouter.post(Routes.login, validate(loginUserSchema), loginUser);

export default authRouter;
