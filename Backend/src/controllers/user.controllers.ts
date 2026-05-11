import { Request, Response } from 'express';
import { createUserInput, ILogin } from '../interface/models/user/user.interface';
import services from '../services';
import { verifyToken } from '../utils/jwt.utils';
import { Types } from 'mongoose';

const login = async (req: Request, res: Response) => {
  const loginDetails: ILogin = req.body;
  const result = await services.userServices.login(loginDetails.email, loginDetails.passwordHash);
  res.status(result.statusCode).json(result);
};

const register = async (req: Request, res: Response) => {
  const userDetails: createUserInput = req.body;
  const result = await services.userServices.register(userDetails);
  res.status(result.statusCode).json(result);
};

const getCurrentUser = async (req: Request, res: Response) => {
  const token = req.headers.token as string;
  const userId = verifyToken(token);
  const result = await services.userServices.getById(userId.id, {});
  res.status(result.statusCode).json(result);
};

const getPublicUser = async (req: Request, res: Response) => {
  const result = await services.userServices.getAll({});
  // Only return the first user for the portfolio
  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    // Strip sensitive info like passwordHash
    const { passwordHash, ...safeUser } = result.data[0];
    result.data = safeUser;
  }
  res.status(result.statusCode).json(result);
};

const updateCurrentUser = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const result = await services.userServices.update(userId.toString(), req.body, userId);
  res.status(result.statusCode).json(result);
};

const userControllers = {
  login,
  register,
  getCurrentUser,
  getPublicUser,
  updateCurrentUser,
};

export default userControllers;
