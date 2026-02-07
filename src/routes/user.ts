import {Router} from 'express';
import {Routes} from '@/interfaces';
import {validate} from '@/middlewares';
import {updateUserSchema} from '@/schemas';
import {deleteUser, getUser, getUsers, updateUser} from '@/controllers/users';

const userRouter = Router();

userRouter.get(Routes.users, getUsers);
userRouter.get(Routes.user, getUser);
userRouter.patch(Routes.user, validate(updateUserSchema), updateUser);
userRouter.delete(Routes.user, deleteUser);

export default userRouter;
