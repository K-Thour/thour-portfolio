import { Types } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface IResume {
  name: string;
  projectCount: number;
  serviceCount: number;
  technologyCount: number;
  projectsUsed: Types.ObjectId[];
  servicesUsed: Types.ObjectId[];
  technologiesUsed: Types.ObjectId[];
  resumeUrl: string;
  resumeFormatUrl?: string;
  jobUrl?: string;
  isDeleted: boolean;
  isActive: boolean;
}

export interface IResumeModel extends IResume, ICommonModel {
  deletedBy: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  deletedAt: Date;
}

export default IResumeModel;
