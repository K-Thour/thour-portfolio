import { ObjectId, Types } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface IProjectMetric {
  project_id: ObjectId;
  value: string;
  label: string;
  isDeleted: boolean;
}

export interface IProjectMetricModel extends IProjectMetric, ICommonModel {
  deletedAt?: Date;
  createdBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

export default IProjectMetricModel;
