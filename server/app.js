import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { articleRoutes } from './api/routes/article';
import { logError, logSuccess } from './utils/console';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/static', express.static('static'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@testing-4dn9p.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
)
  .then(() => {
    logSuccess('Connected to the MongoDB,');
  })
  .catch(err => {
    logError('Cannot connect to the MongoDB.');
    logError(err);
  });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    return res.status(200).json({});
  }

  next();
});

app.use('/articles', articleRoutes);

app.use((req, res, next) => {
  const err = new Error('Not found');

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(404).json({
      message: 'Not found'
    });
  }

  res.status(err.status || 500).json({
    message: err.message
  });
});

export default app;
