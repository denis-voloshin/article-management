import express from 'express';

import { ArticleController } from '../controllers/article';

export const articleRoutes = express.Router();

articleRoutes.get('/', ArticleController.articleGetList);

articleRoutes.post('/', ArticleController.articleCreate);

articleRoutes.get('/:articleId', ArticleController.articleGet);

articleRoutes.patch('/:articleId', ArticleController.articleUpdate);

articleRoutes.delete('/:articleId', ArticleController.articleDelete);
