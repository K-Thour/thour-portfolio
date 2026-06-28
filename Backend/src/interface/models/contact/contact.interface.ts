import { Types } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface IContact {
  label: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
  availability: string;
  timezone: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IContactModel extends IContact, ICommonModel {
  deletedAt?: Date;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
}

export interface createContactInput {
  label: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
  availability: string;
  timezone: string;
}

export default IContactModel;
