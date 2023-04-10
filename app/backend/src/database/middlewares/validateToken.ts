import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const verify = verifyToken(token);

    if (!verify) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  return next();
};
