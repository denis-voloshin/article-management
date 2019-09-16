import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'jsonwebtoken';

export const handleErrors = app => {
  app.use((req, res, next) => {
    const err = new Error('Page was not found');

    err.status = 404;
    next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(404).json({
        message: 'Not found'
      });
    }

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: err.message
      });
    }

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: 'Token expired'
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: 'Token is invalid'
      });
    }

    if (err instanceof jwt.NotBeforeError) {
      return res.status(401).json({
        message: 'Token is not active'
      });
    }

    res.status(err.status || 500).json({
      message: err.message
    });
  });
};
