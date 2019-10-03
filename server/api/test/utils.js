import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { UserModel } from '../models/user';

export const ensureConnection = () => new Promise((resolve, reject) => {
  if (mongoose.connection.db) {
    return resolve(mongoose.connection.db);
  }
  mongoose.connection.on('connected', () =>
    resolve(mongoose.connection.db)
  );
  mongoose.connection.on('error' , reject);
});

export const cleanDatabase = cb => mongoose.connection.db.dropDatabase(cb);

export const createUser = async userCredentials => {
  const user = new UserModel({
    _id: mongoose.Types.ObjectId(),
    login: userCredentials.login,
    password: bcrypt.hashSync(userCredentials.password, 10)
  });

  return user.save();
};
