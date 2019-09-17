import mongoose from 'mongoose';

import { logError, logSuccess } from '../utils/console';

export const connectToDatabase = async () => {
  try {
    const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_DB : process.env.MONGO_DB;

    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@testing-4dn9p.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );
    logSuccess('Connected to the MongoDB.');
  } catch (err) {
    logError('Cannot connect to the MongoDB.');
    logError(err);
  }
};
