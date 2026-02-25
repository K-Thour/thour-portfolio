import { Types } from 'mongoose';
import { ICommonModel, IImageData } from '../../common/common.interface';

export interface IService {
  name: string;
  decription: string;
  technologies: Types.ObjectId[];
  iconUrl: IImageData;
  mainImageUrl: IImageData;
  imagesUrl: IImageData[];
  isActive: boolean;
}

export interface IServiceModel extends IService, ICommonModel {
  deletedAt?: Date;
  createdBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted?: boolean;
}

export default IServiceModel;
