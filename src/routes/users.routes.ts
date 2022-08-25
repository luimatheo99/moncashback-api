import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticateUser } from '../middlewares/ensureAuthenticateUser';
import { ensureAuthenticatePartner } from '../middlewares/ensureAuthenticatePartner';

import upload from '../config/upload';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController';
import { AlreadyExistsPasswordUserController } from '../modules/users/useCases/alreadyExistsPasswordUser/AlreadyExistsPasswordUserController';
import { AlreadyExistsPhoneUserController } from '../modules/users/useCases/alreadyExistsPhoneUser/AlreadyExistsPhoneUserController';
import { AlreadyExistsCodeUserController } from '../modules/users/useCases/alreadyExistsCodeUser/AlreadyExistsCodeUserController';
import { GetUserController } from '../modules/users/useCases/getUser/GetUserController';
import { AlreadyExistsCodePartnerController } from '../modules/users/useCases/alreadyExistsCodePartner/AlreadyExistsCodePartnerController';
import { UpdateUserAvatarController } from '../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';
import { UpdateUserDeviceController } from '../modules/users/useCases/updateUserDevice/UpdateUserDeviceController';
import { SendForgotPasswordController } from '../modules/users/useCases/sendForgotPassword/SendForgotPasswordController';
import { ResetPasswordController } from '../modules/users/useCases/resetPassword/ResetPasswordController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const alreadyExistsPasswordUserController = new AlreadyExistsPasswordUserController();
const alreadyExistsPhoneUserController = new AlreadyExistsPhoneUserController();
const alreadyExistsCodeUserController = new AlreadyExistsCodeUserController();
const getUserController = new GetUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserDeviceController = new UpdateUserDeviceController();
const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const alreadyExistsCodePartnerController = new AlreadyExistsCodePartnerController();

const uploadAvatar = multer(upload);

usersRoutes.post('/', createUserController.handle);

usersRoutes.put('/updateUser/:id', updateUserController.handle);

usersRoutes.get('/code=:code', ensureAuthenticateUser, alreadyExistsCodeUserController.handle);

usersRoutes.get('/getUser/code=:code', ensureAuthenticatePartner, alreadyExistsCodePartnerController.handle);

usersRoutes.get('/password=:password', ensureAuthenticateUser, alreadyExistsPasswordUserController.handle);

usersRoutes.get('/phone=:phone', ensureAuthenticateUser, alreadyExistsPhoneUserController.handle);

usersRoutes.get('/getUser/:id', ensureAuthenticateUser, getUserController.handle);

usersRoutes.patch('/updateUser/:id/avatar', ensureAuthenticateUser, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

usersRoutes.put('/updateUser/:id/device', updateUserDeviceController.handle);

usersRoutes.post('/password/forgot', sendForgotPasswordController.handle);

usersRoutes.post('/password/reset', resetPasswordController.handle);

export { usersRoutes };
