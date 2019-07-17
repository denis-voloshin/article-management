import jwt from 'jsonwebtoken';
import * as R from 'ramda';

import { UserModel } from '../api/models/user';

export const generateUserToken = (_id, login) => jwt.sign(
  { _id, login },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES }
);

export const getTokenFromHeader = R.compose(R.last, R.split('Bearer '));

export const getUserByToken = token => UserModel.findOne({ token }).exec();
