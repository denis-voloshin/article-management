import express from 'express';
import multer from 'multer';
import * as R from 'ramda';

import { ArticleController } from '../controllers/article';
import { ArticleValidator } from '../validators';
import { validationHandler } from '../handlers/validation';
import { mkdirIfNotExistSync } from '../../utils/fs';
import { getCurrentDate } from '../../utils/date';
import { rootPath } from '../../utils/constants';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const currentDate = getCurrentDate();
    const dir = `./static/img/${currentDate.year}/${currentDate.month}/${currentDate.day}`;

    mkdirIfNotExistSync(`${rootPath}/${dir}`);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const currentDate = getCurrentDate();
    const fileName = `${currentDate.unixTimestamp}_${file.originalname}`;

    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];

  if (R.none(R.equals(file.mimetype), allowedMimeTypes)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

export const articleRoutes = express.Router();

articleRoutes.get(
  '/',
  ArticleController.articleGetList
);

articleRoutes.post(
  '/',
  upload.single('image'),
  ArticleValidator,
  validationHandler,
  ArticleController.articleCreate
);

articleRoutes.get(
  '/:articleId',
  ArticleController.articleGet
);

articleRoutes.patch(
  '/:articleId',
  upload.single('image'),
  ArticleValidator,
  validationHandler,
  ArticleController.articleUpdate
);

articleRoutes.delete(
  '/:articleId',
  ArticleController.articleDelete
);
