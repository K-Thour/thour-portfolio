import { Types } from 'mongoose';
import { ICommonModel } from '../../common/common.interface';

export interface IPortfolio {
  name: string;
  project: Types.ObjectId[];
  isDeleted: boolean;
}

export interface IPortfolioModel extends IPortfolio, ICommonModel {
  deletedBy: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  deletedAt: Date;
}
