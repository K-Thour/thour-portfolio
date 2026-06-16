import authMiddleware from '../middlewares/auth.middleware';
import { verifyToken } from '../utils/jwt.utils';
import models from '../models';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

jest.mock('../utils/jwt.utils');
jest.mock('../models');

describe('authMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if token is missing', async () => {
    await authMiddleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Token missing',
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', async () => {
    req.headers!.authorization = 'Bearer invalid-token';
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid signature');
    });

    await authMiddleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Invalid token',
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if user is not found in database', async () => {
    req.headers!.authorization = 'Bearer valid-token';
    (verifyToken as jest.Mock).mockReturnValue({ id: '507f1f77bcf86cd799439011' });
    (models.user.repo.getOne as jest.Mock).mockResolvedValue(null);

    await authMiddleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User not found',
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should set req.userId and call next if user is found', async () => {
    const mockUserId = new Types.ObjectId('507f1f77bcf86cd799439011');
    const mockUser = {
      _id: mockUserId,
      email: 'test@example.com',
    };
    req.headers!.authorization = 'Bearer valid-token';
    (verifyToken as jest.Mock).mockReturnValue({ id: '507f1f77bcf86cd799439011' });
    (models.user.repo.getOne as jest.Mock).mockResolvedValue(mockUser);

    await authMiddleware(req as Request, res as Response, next);
    expect(req.userId).toEqual(mockUserId);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
