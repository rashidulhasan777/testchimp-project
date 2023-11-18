import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utilities/auth';

export interface AuthRequest extends Request {
  user?: string | object;
}

const protectMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    res.status(401);
    res.json({ message: 'You are not authorized' });
    return;
  }
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: 'You are not authorized' });
    return;
  }
};

export default protectMiddleware;
