import { Request, Response } from 'express';
import services from '../services';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result as any).data = safeUser;
  }
  res.status(result.statusCode).json(result);
};

const updateCurrentUser = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const result = await services.userServices.update(userId.toString(), req.body, userId);
  res.status(result.statusCode).json(result);
};

const changePassword = async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.userId);
  const { currentPassword, newPassword } = req.body;
  const result = await services.userServices.changePassword(
    userId.toString(),
    currentPassword,
    newPassword,
  );
  res.status(result.statusCode).json(result);
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await services.userServices.forgotPassword(email);
  res.status(result.statusCode).json(result);
};

const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await services.userServices.verifyOtp(email, otp);
  res.status(result.statusCode).json(result);
};

const resetPassword = async (req: Request, res: Response) => {
  const { email, resetToken, password } = req.body;
  const result = await services.userServices.resetPassword(email, resetToken, password);
  res.status(result.statusCode).json(result);
};

const userControllers = {
  login,
  register,
  getCurrentUser,
  getPublicUser,
  updateCurrentUser,
  changePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
};

export default userControllers;
