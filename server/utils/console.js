/* eslint-disable no-console */

import chalk from 'chalk';
import _ from 'lodash/fp';

const getLogger = () => {
  if (process.env.NODE_ENV === 'production') {
    return _.noop;
  }

  return console.log;
};

const log = getLogger();

export const logSuccess = _.flow([chalk.green, log]);

export const logWarning = _.flow([chalk.yellow, log]);

export const logError = _.flow([chalk.red, log]);

export const logInfo = _.flow([chalk.cyan, log]);
