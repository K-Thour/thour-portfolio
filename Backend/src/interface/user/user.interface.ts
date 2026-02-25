import { Types } from 'mongoose';
import { ICommonModel } from '../common/common.interface';

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  experience: number;
  completedProjects: number;
  solvedProblems: number;
  happyClients: number;
  InstagramURL?: string;
  LinkedInURL?: string;
  GitHubURL?: string;
  isDeleted: boolean;
}

export interface IUserModel extends IUser, ICommonModel {
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  deletedAt?: Date;
}

export default IUserModel;
