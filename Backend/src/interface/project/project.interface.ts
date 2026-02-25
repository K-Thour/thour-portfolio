import { Types } from 'mongoose';
import { ICommonModel, IImageData } from '../common/common.interface';
import { EDeviceType } from '../common/common.enum';

export interface IProject {
  title: string;
  category: Types.ObjectId;
  description: string;
  image: IImageData;
  device: EDeviceType;
  year: number;
  client: string;
  fullDescription: string;
  role: string;
  outcome: string;
  workingUrl: string;
  githubUrl: string;
  screenshots: Types.ObjectId[];
  projectMetric: Types.ObjectId[];
  projectTestimonial: Types.ObjectId[];
  techStack: Types.ObjectId[];
  isDeleted: boolean;
  isActive: boolean;
}

export interface IProjectModel extends IProject, ICommonModel {
  deletedBy: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  deletedAt: Date;
}

export default IProjectModel;
