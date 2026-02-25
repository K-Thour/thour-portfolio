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
  deleted_at?: Date;
  created_by?: Types.ObjectId;
  updated_by?: Types.ObjectId;
  deleted_by?: Types.ObjectId;
}

export default IContactModel;
