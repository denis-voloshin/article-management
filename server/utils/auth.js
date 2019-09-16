import jwt from 'jsonwebtoken';
import _ from 'lodash/fp';

import { UserModel } from '../api/models/user';

export const generateUserToken = (_id, login) => jwt.sign(
  { _id, login },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES }
);

export const getTokenFromHeader = authorization => {
  if (_.isNil(authorization)) {
    return void 0;
  }

  return _.flow([
    _.split('Bearer '),
    _.last
  ])(authorization);
};

export const getUserByToken = token => UserModel.findOne({ token }).exec();
