import jwt from 'jsonwebtoken';

export const getUserToken = (_id, login) => jwt.sign(
  { _id, login },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES }
);
