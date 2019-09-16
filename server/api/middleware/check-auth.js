import jwt from 'jsonwebtoken';
import _ from 'lodash/fp';

import { getTokenFromHeader, getUserByToken } from '../../utils/auth';

export const checkAuth = async (req, res, next) => {
  try {
    if (_.isNil(req.headers.authorization)) {
      return res.status(401).json({
        message: 'Token is missing'
      });
    }

    const token = getTokenFromHeader(req.headers.authorization);

    jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserByToken(token);

    if (!user) {
      return res.status(401).json({
        message: 'Token does not exists'
      });
    }

    // eslint-disable-next-line require-atomic-updates
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
