import { ObjectId } from 'mongoose';
import { ICommonModel, IImageData } from '../common/common.interface';
import { EDeviceType } from '../common/common.enum';

export interface IProject {
  title: string;
  category: ObjectId;
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
  screenshots: ObjectId[];
  projectMetric: ObjectId[];
  projectTestimonial: ObjectId[];
  techStack: ObjectId[];
  isDeleted: boolean;
  isActive: boolean;
}

export interface IProjectModel extends IProject, ICommonModel {
  deletedBy: ObjectId;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  deletedAt: Date;
}

export default IProjectModel;
