import { Model, Query } from 'mongoose';

const findAndUpdate = async <T>(
  id: string,
  updateData: Partial<T>,
  model: Model<T>,
): Promise<T | null> => {
  return model.findByIdAndUpdate(id, updateData, { new: true }).lean() as T | null;
};

const findByIdAndDelete = async <T>(id: string, model: Model<T>): Promise<T | null> => {
  return model.findByIdAndDelete(id).lean() as T | null;
};

const findById = async <T>(id: string, query: Query<T[], T>): Promise<T | null> => {
  return query.findById(id).lean() as T | null;
};

const find = async <T>(query: Query<T[], T>): Promise<T[]> => {
  return query.find().lean() as unknown as T[];
};

const create = async <T>(data: T, model: Model<T>): Promise<T> => {
  return model.create(data);
};

const commonRepository = {
  findAndUpdate,
  findByIdAndDelete,
  findById,
  find,
  create,
};

export default commonRepository;
