import { ObjectId } from 'mongoose';
import { ELanguageLevel } from './common.enum';

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

export interface IImageData {
  publicId: string;
  url: string;
  alt?: string;
}

export interface ILanguage {
  name: string;
  level: ELanguageLevel;
}
