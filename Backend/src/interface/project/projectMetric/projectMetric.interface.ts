import { ObjectId } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface IProjectMetric {
  project_id: ObjectId;
  value: string;
  label: string;
  isDeleted: boolean;
}

export interface IProjectMetricModel extends IProjectMetric, ICommonModel {}

export default IProjectMetricModel;
