import express from 'express';

import { ArticleController } from '../controllers/article';
import { validators, validationHandler } from '../validators';

export const articleRoutes = express.Router();

articleRoutes.get('/', ArticleController.articleGetList);

articleRoutes.post('/', validators.article, validationHandler, ArticleController.articleCreate);

articleRoutes.get('/:articleId', ArticleController.articleGet);

articleRoutes.patch('/:articleId', validators.article, validationHandler, ArticleController.articleUpdate);

articleRoutes.delete('/:articleId', ArticleController.articleDelete);
