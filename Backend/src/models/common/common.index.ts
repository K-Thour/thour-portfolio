import { Model, Schema } from 'mongoose';
import { IBaseRepo } from '../../interface/models/common/baseRepo.interface';

export interface ICommonModelIndex<T, R = IBaseRepo<T>> {
  model: Model<T>;
  repo: R;
  schema: Schema<T>;
}
