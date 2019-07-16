import jwt from 'jsonwebtoken';
import * as R from 'ramda';

export const checkAuth = (req, res, next) => {
  try {
    const token = R.compose(
      R.last,
      R.split('Bearer ')
    )(req.headers.authorization);

    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    next(err);
  }
};
