import { validationResult } from 'express-validator';

import { ArticleValidator } from './article';

export const validationHandler = async (req, res, next) => {
  try {
    const validations = validationResult(req);

    if (!validations.isEmpty()) {
      return res.status(400).json({
        message: 'Validation error',
        validationErrors: validations.mapped()
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const validators = {
  article: ArticleValidator
};
