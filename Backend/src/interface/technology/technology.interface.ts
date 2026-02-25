import { ObjectId } from 'mongoose';
import { ICommonModel } from '../common/common.interface';

export interface ITechnology {
  name: string;
  description: string;
  category: string;
  iconUrl: string;
}

export interface ITechnologyModel extends ITechnology, ICommonModel {
  deletedAt?: Date;
  createdBy?: ObjectId;
  deletedBy?: ObjectId;
  updatedBy?: ObjectId;
  isDeleted?: boolean;
}

export default ITechnologyModel;
