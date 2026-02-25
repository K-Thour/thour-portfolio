import { ObjectId } from 'mongoose';

export interface ICommonResponse<T> {
  data: T[] | T | null;
  total: number;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ICommonModel {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
