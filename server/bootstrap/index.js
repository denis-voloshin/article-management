import express from 'express';

import 'dotenv/config';

import { setupMiddleware } from './middleware';
import { initStatic } from './static';
import { connectToDatabase } from './database';
import { setupCors } from './cors';
import { initRoutes } from './router';
import { handleErrors } from './errors';

export const bootstrap = () => {
  const app = express();

  setupMiddleware(app);
  initStatic(app);
  connectToDatabase();
  setupCors(app);
  initRoutes(app);
  handleErrors(app);

  return app;
};
