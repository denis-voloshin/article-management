import express from 'express';

export const initStatic = app => {
  app.use('/static', express.static('static'));
};
