import mongoose from 'mongoose';
import { UserModel } from '../models/user';
import bcrypt from 'bcrypt';

export const ensureConnection = () => new Promise(resolve => {
  if (mongoose.connection.db) {
    return resolve(mongoose.connection.db);
  }
  mongoose.connection.on('connected', () =>
    resolve(mongoose.connection.db)
  );
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
