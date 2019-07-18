import { getTokenFromHeader } from '../../utils/auth';
import { UserModel } from '../models/user';

export const getUserFromToken = async (req, res, next) => {
  const token = getTokenFromHeader(req.headers.authorization);

  // eslint-disable-next-line require-atomic-updates
  req.user = await UserModel.findOne({ token }).exec();

  next();
};
