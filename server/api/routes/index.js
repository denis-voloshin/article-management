import express from 'express';
import { articleRoutes } from './article';
import { userRoutes } from './user';

export const Router = express.Router();

Router.use('/articles', articleRoutes);

Router.use('/users', userRoutes);
