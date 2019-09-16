/* eslint-disable no-console */
/* eslint-disable no-empty-function */

import chalk from 'chalk';
import _ from 'lodash/fp';

const getLogger = () => {
  if (process.env.NODE_ENV !== 'production') {
    return console.log;
  }

  return () => {};
};

export const log = getLogger();

export const logSuccess = _.flow([chalk.green, getLogger()]);

export const logWarning = _.flow([chalk.yellow, getLogger()]);

export const logError = _.flow([chalk.red, getLogger()]);

export const logInfo = _.flow([chalk.cyan, getLogger()]);
