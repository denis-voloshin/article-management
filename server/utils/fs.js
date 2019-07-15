import fs from 'fs';

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
  fs.stat(filePath, err => {
    if (!err) {
      fs.unlink(filePath, () => {
        // File removed
      });
    }
  });
};
