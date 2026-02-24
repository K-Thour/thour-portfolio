import { Model, Query } from 'mongoose';
import { IBaseRepoParams } from './baseRepo.interface';

export interface IqueryBuilderParams<T> {
  model: Model<T>;
  params?: IBaseRepoParams<T>;
}

export interface IqueryBuilderReturn<T> {
  query: Query<T[], T, never>;
  totalQuery: Query<number, T, never>;
}
