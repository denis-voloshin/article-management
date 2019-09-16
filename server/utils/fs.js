import fs from 'fs';
import _ from 'lodash/fp';
import { protectedFilePaths } from './constants';

export const mkdirIfNotExistSync = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

export const unlinkIfExistSync = filePath => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const unlinkIfExist = filePath => {
  if (_.some(_.endsWith(_.__, filePath), protectedFilePaths)) {
    return;
  }

  fs.stat(filePath, err => {
    if (!err) {
      fs.unlink(filePath, () => {
        // File removed
      });
    }
  });
};
