import fs from 'fs';

export const mkdirIfNotExistSync = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};
