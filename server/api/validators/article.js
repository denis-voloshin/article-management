import { body } from 'express-validator';

export const ArticleValidator = [
  body('title').exists().withMessage('Article title cannot be empty'),
  body('text').exists().withMessage('Article text cannot be empty'),
  body('isPublic')
    .exists().withMessage('Article isPublic flag cannot be empty')
    .isBoolean().withMessage('Article isPublic flag should be a boolean')
];
