import { Types } from 'mongoose';
import { ICommonModel, IImageData } from '../../common/common.interface';

export interface ITechnology {
  name: string;
  description: string;
  category: string;
  iconUrl: IImageData;
  isActive: boolean;
}

export interface ITechnologyModel extends ITechnology, ICommonModel {
  deletedAt?: Date;
  createdBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted?: boolean;
}

export default ITechnologyModel;
