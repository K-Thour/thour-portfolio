import { Types } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface ILead {
  name: string;
  email: string;
  companyName: string;
  mobileNumber: string;
  service: Types.ObjectId;
  description: string;
}

export interface ILeadModel extends ILead, ICommonModel {
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted?: boolean;
}

export default ILeadModel;
