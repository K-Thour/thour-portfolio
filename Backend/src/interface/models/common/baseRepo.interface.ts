import { Types } from 'mongoose';

export type IPopulateOptions = {
  path: string;
  select?: string;
  model?: string;
  populate?: IPopulateOptions;
};

export type IBaseRepoParams<T> = Partial<T> & {
  filter?: Partial<T>[];
  populate?: IPopulateOptions | IPopulateOptions[];
  select?: string;
  sort?: Partial<Record<Extract<keyof T, string>, 1 | -1>>;
};

export interface IBaseRepo<T> {
  get(params: IBaseRepoParams<T>): Promise<T[]>;
  getOne(params?: IBaseRepoParams<T>): Promise<T | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(data: any, createdBy?: Types.ObjectId): Promise<T>;
  update(id: string, data: Partial<T>, updatedBy: Types.ObjectId): Promise<T | null>;
  softDelete(id: string, date: Date, deletedBy: Types.ObjectId): Promise<T | null>;
  deleteOne(id: string): Promise<T | null>;
}
