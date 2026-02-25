import { ObjectId, Types } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface IProjectTestimonial {
  project_id: ObjectId;
  quote: string;
  author: string;
  author_role: string;
  isDeleted: boolean;
}

export interface IProjectTestimonialModel extends IProjectTestimonial, ICommonModel {
  deletedAt?: Date;
  createdBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

export default IProjectTestimonialModel;
