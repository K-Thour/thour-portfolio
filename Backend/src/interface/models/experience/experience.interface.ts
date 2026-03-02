import { Types } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface IExperience {
  companyName: string;
  position: string;
  field: string;
  projectsCompleted: Types.ObjectId[];
  description: string;
  dateOfJoining: Date;
  dateOfLeaving: Date;
  stillWorking: boolean;
  isDeleted: boolean;
}

export interface IExperienceModel extends IExperience, ICommonModel {
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  deletedBy: Types.ObjectId;
  deletedAt: Date;
}

export default IExperienceModel;
