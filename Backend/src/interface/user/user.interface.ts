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

interface IUserModel extends IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IUserModel;
