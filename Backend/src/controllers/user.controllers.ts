import { Request, Response } from 'express';
import { createUserInput, ILogin } from '../interface/models/user/user.interface';
import services from '../services';
import { verifyToken } from '../utils/jwt.utils';
import { Types } from 'mongoose';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await services.userServices.login(email, password);
  res.status(result.statusCode).json(result);
};

const register = async (req: Request, res: Response) => {
  const { password, ...otherDetails } = req.body;
  const result = await services.userServices.register({
    ...otherDetails,
    passwordHash: password,
  } as any);
  res.status(result.statusCode).json(result);
};

const getCurrentUser = async (req: Request, res: Response) => {
  const result = await services.userServices.getById(req.userId!.toString(), {});
  res.status(result.statusCode).json(result);
};

const getPublicUser = async (req: Request, res: Response) => {
  const result = await services.userServices.getAll({});
  // Only return the first user for the portfolio
  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    const user = result.data[0];
    const safeUser = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      image: user.image,
      experience: user.experience,
      completedProjects: user.completedProjects,
      solvedProblems: user.solvedProblems,
      happyClients: user.happyClients,
      InstagramURL: user.InstagramURL,
      LinkedInURL: user.LinkedInURL,
      GitHubURL: user.GitHubURL,
      hobbies: user.hobbies || [],
      languages: user.languages || [],
    };
    (result as any).data = safeUser;
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
