import { Types } from 'mongoose';
import { EDay } from '../../common/common.enum';
import { ICommonModel } from '../../common/common.interface';

export interface IContact {
  Address1: string;
  Address2?: string;
  startWorkingDay: EDay;
  endWorkingDay: EDay;
  startWorkingHour: string;
  endWorkingHour: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IContactModel extends IContact, ICommonModel {
  deletedAt?: Date;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
}

export default IContactModel;
