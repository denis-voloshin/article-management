import mongoose from 'mongoose';

import { logError, logSuccess } from '../utils/console';

export const connectToDatabase = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@testing-4dn9p.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
    .then(() => {
      logSuccess('Connected to the MongoDB.');
    })
    .catch(err => {
      logError('Cannot connect to the MongoDB.');
      logError(err);
    });
};
