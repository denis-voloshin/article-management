import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import * as R from 'ramda';

import { UserModel } from '../models/user';
import { getUserToken } from '../../utils/auth';

export const UserController = {};

UserController.register = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const existingUser = await UserModel.findOne({ login }).exec();

    if (existingUser) {
      return res.status(409).json({
        message: 'User with such login exists'
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new UserModel({
      _id: mongoose.Types.ObjectId(),
      login,
      password: hashedPassword
    });

    await user.save();

    const token = getUserToken(user._id, user.login);

    res.status(201).json({
      message: 'User created',
      user: R.omit(['password'])(user.toObject()),
      token
    });
  } catch (err) {
    next(err);
  }
};

UserController.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const user = await UserModel.findOne({ login }).exec();

    if (!user) {
      return res.status(401).json({
        message: 'Login or password is incorrect'
      });
    }

    const arePasswordsMatch = bcrypt.compareSync(password, user.password);

    if (!arePasswordsMatch) {
      return res.status(401).json({
        message: 'Login or password is incorrect'
      });
    }

    const token = getUserToken(user._id, user.login);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
