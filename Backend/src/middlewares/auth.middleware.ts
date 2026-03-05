import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import models from '../models';
import { STATUS_CODE } from '../constants/statusCode.constant';
import commonResponse from '../common/commonResponses';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const user = await models.user.repo.getById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.userId = user._id;
    next();
  } catch (err) {
    const error = commonResponse.error(err, 'Invalid token', STATUS_CODE.UNAUTHORIZED, 0);
    return res.status(error.statusCode).json(error);
  }
}

export default authMiddleware;
