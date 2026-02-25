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

export interface IUserModel extends IUser, ICommonModel {}

export default IUserModel;
