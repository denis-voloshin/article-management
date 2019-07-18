import fs from 'fs';
import * as R from 'ramda';
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
  if (R.any(R.endsWith(R.__, filePath), protectedFilePaths)) {
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
