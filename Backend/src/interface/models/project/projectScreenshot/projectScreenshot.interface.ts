import { ObjectId, Types } from 'mongoose';
import { ICommonModel, IImageData } from '../../../common/common.interface';

export interface IProjectScreenshot {
  project_id: ObjectId;
  image: IImageData;
  display_order: number;
  isDeleted: boolean;
}

export interface IProjectScreenshotModel extends IProjectScreenshot, ICommonModel {
  deletedAt?: Date;
  createdBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

export default IProjectScreenshotModel;
