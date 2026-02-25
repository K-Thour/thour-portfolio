import { ObjectId } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface IProjectTestimonial {
  project_id: ObjectId;
  quote: string;
  author: string;
  author_role: string;
  isDeleted: boolean;
}

export interface IProjectTestimonialModel extends IProjectTestimonial, ICommonModel {}

export default IProjectTestimonialModel;
