import { Types } from 'mongoose';
import queryBuilder from '../../common/queryBuilder';
import IUserModel, { createUserInput } from '../../interface/models/user/user.interface';
import { IUserRepo, IUserRepoParams } from '../../interface/models/user/userRepo.interface';
import commonRepository from '../common/common.repository';
import userModel from './user.model';

const get = (params?: IUserRepoParams): Promise<IUserModel[]> => {
  const query = queryBuilder({ model: userModel, params });
  return commonRepository.find(query);
};

const getOne = (params?: IUserRepoParams): Promise<IUserModel | null> => {
  const query = queryBuilder({ model: userModel, params });
  return commonRepository.findOne(query);
};

const create = (data: createUserInput, createdBy?: Types.ObjectId): Promise<IUserModel> => {
  return commonRepository.create({ ...data, createdBy }, userModel);
};

const update = (
  id: string,
  data: Partial<IUserModel>,
  updatedBy: Types.ObjectId,
): Promise<IUserModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, userModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IUserModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    userModel,
  );
};

const deleteOne = (id: string): Promise<IUserModel | null> => {
  return commonRepository.findByIdAndDelete(id, userModel);
};

const userRepository: IUserRepo = {
  get,
  getOne,
  create,
  update,
  softDelete,
  deleteOne,
};

export default userRepository;
