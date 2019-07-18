/* eslint-disable no-console */
/* eslint-disable no-empty-function */

import chalk from 'chalk';
import * as R from 'ramda';

const getLogger = () => {
  if (process.env.NODE_ENV !== 'production') {
    return console.log;
  }

  return () => {};
};

export const log = getLogger();

export const logSuccess = R.compose(getLogger(), chalk.green);

export const logWarning = R.compose(getLogger(), chalk.yellow);

export const logError = R.compose(getLogger(), chalk.red);

export const logInfo = R.compose(getLogger(), chalk.cyan);
