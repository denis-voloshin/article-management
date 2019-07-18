import express from 'express';

import { UserRegisterValidator, UserLoginValidator } from '../validators/user';
import { validationHandler } from '../middleware/validation';
import { UserController } from '../controllers/user';

export const userRoutes = express.Router();

userRoutes.post(
  '/register',
  UserRegisterValidator,
  validationHandler,
  UserController.register
);

userRoutes.post(
  '/login',
  UserLoginValidator,
  validationHandler,
  UserController.login
);
