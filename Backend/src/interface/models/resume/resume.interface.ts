import { Types } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export type ResumeDesignType = 'latex' | 'pdf' | 'image' | 'modern' | 'ats';

export interface IResume {
  name: string;
  description?: string;
  summary?: string;
  targetRole?: string;
  designType?: ResumeDesignType;
  designFileUrl?: string;
  projectCount: number;
  serviceCount: number;
  technologyCount: number;
  experiencesUsed?: Types.ObjectId[];
  projectsUsed: Types.ObjectId[];
  servicesUsed: Types.ObjectId[];
  technologiesUsed: Types.ObjectId[];
  resumeUrl: string;
  resumeFormatUrl?: string;
  jobUrl?: string;
  latexCode?: string;
  isDeleted: boolean;
  isActive: boolean;
}

export interface IResumeModel extends IResume, ICommonModel {
  deletedBy: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  deletedAt: Date;
}

export interface createResumeInput {
  name: string;
  description?: string;
  summary?: string;
  targetRole?: string;
  designType?: ResumeDesignType;
  designFileUrl?: string;
  projectCount: number;
  serviceCount: number;
  technologyCount: number;
  selectedExperienceIds?: string[];
  selectedProjectIds?: string[];
  experiencesUsed?: Types.ObjectId[];
  projectsUsed: Types.ObjectId[];
  servicesUsed: Types.ObjectId[];
  technologiesUsed: Types.ObjectId[];
  resumeUrl: string;
  resumeFormatUrl?: string;
  jobUrl?: string;
  latexCode?: string;
  isActive?: boolean;
}

export default IResumeModel;
