import { Types } from 'mongoose';
import { ICommonModel, IImageData, ILanguage } from '../../common/common.interface';

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  image?: IImageData;
  experience: number;
  completedProjects: number;
  solvedProblems: number;
  happyClients: number;
  InstagramURL?: string;
  LinkedInURL?: string;
  GitHubURL?: string;
  isDeleted: boolean;
  hobbies: string[];
  languages: ILanguage[];
}

export interface IUserModel extends IUser, ICommonModel {
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  deletedAt?: Date;
}

export interface ILogin {
  email: string;
  passwordHash: string;
}

export interface createUserInput {
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  image?: IImageData;
  experience: number;
  completedProjects: number;
  solvedProblems: number;
  happyClients: number;
  InstagramURL?: string;
  LinkedInURL?: string;
  GitHubURL?: string;
  hobbies: string[];
  languages: ILanguage[];
}

export default IUserModel;
