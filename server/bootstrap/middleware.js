import morgan from 'morgan';
import express from 'express';

export const setupMiddleware = app => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
};
