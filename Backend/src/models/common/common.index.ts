import { Model, Schema } from 'mongoose';
import { IBaseRepo } from '../../interface/models/common/baseRepo.interface';

export interface ICommonModelIndex<T> {
  model: Model<T>;
  repo: IBaseRepo<T>;
  schema: Schema<T>;
}
