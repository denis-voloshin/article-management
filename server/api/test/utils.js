import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import uuid from 'uuid/v1';
import _ from 'lodash/fp';
import fs from 'fs';
import path from 'path';

import { UserModel } from '../models/user';
import { generateUserToken } from '../../utils/auth';
import { ArticleModel } from '../models/article';
import { logError } from '../../utils/console';

export const testUserCredentials = {
  login: _.replace(/-/g, '', uuid()),
  password: uuid()
};

export const testPublicArticle = {
  title: uuid(),
  text: uuid(),
  isPublic: true,
  image: fs.readFileSync(path.resolve(__dirname, 'no-image.jpg'))
};

export const testPrivateArticle = {
  title: uuid(),
  text: uuid(),
  isPublic: false,
  image: fs.readFileSync(path.resolve(__dirname, 'no-image.jpg'))
};

export const beforeEachHook = async () => {
  try {
    await ensureConnection();
    await cleanDatabase();
  } catch (err) {
    logError('before hook error occurred');
    logError(err);
  }
};

export const afterHook = async () => {
  try {
    await ensureConnection();
    await cleanDatabase();
  } catch (err) {
    logError('after hook error occurred');
    logError(err);
  }
};

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

export const createTestUser = (userCredentials = null) => {
  const user = new UserModel({
    _id: mongoose.Types.ObjectId(),
    login: _.getOr(testUserCredentials.login, 'login', userCredentials),
    password: bcrypt.hashSync(_.getOr(testUserCredentials.password, 'password', userCredentials), 10)
  });

  user.token = generateUserToken(user._id, user.login);

  return user.save();
};

export const createTestArticle = async (isPublic = true, authorCredentials = null) => {
  const author = await createTestUser(authorCredentials);

  const article = isPublic
    ? new ArticleModel(_.pick(['title', 'text', 'isPublic'], testPublicArticle))
    : new ArticleModel(_.pick(['title', 'text', 'isPublic'], testPrivateArticle));

  article._id = mongoose.Types.ObjectId();
  article.author = author;

  await article.save();

  return { article, author };
};

export const createTestArticles = async () => {
  const author = await createTestUser();

  const publicArticle = new ArticleModel({
    ..._.pick(['title', 'text', 'isPublic'], testPublicArticle),
    _id: mongoose.Types.ObjectId(),
    author
  });
  const privateArticle = new ArticleModel({
    ..._.pick(['title', 'text', 'isPublic'], testPrivateArticle),
    _id: mongoose.Types.ObjectId(),
    author
  });

  await publicArticle.save();
  await privateArticle.save();

  return { author, articles: [publicArticle, privateArticle] };
};

export const validateUser = user => {
  expect(user).to.have.property('_id').be.a('string');
  expect(user).to.have.property('login').be.a('string');
};

export const validateArticle = article => {
  expect(article).to.have.property('_id').be.a('string');
  expect(article).to.have.property('title').be.a('string');
  expect(article).to.have.property('text').be.a('string');
  expect(article).to.have.property('isPublic').be.a('boolean');
};
