import { ObjectId } from 'mongoose';
import { ICommonModel, IImageData } from '../common/common.interface';

export interface IService {
  name: string;
  decription: string;
  technologies: ObjectId[];
  iconUrl: IImageData;
  mainImageUrl: IImageData;
  imagesUrl: IImageData[];
  isActive: boolean;
}

export interface IServiceModel extends IService, ICommonModel {
  deletedAt?: Date;
  createdBy?: ObjectId;
  deletedBy?: ObjectId;
  updatedBy?: ObjectId;
  isDeleted?: boolean;
}

export default IServiceModel;
