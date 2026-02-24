import queryBuilder from '../../common/queryBuilder';
import IUserModel from '../../interface/user/user.interface';
import { IUserRepo, IUserRepoParams } from '../../interface/user/userRepo.interface';
import commonRepository from '../common/common.repository';
import userModel from './user.model';

const get = (params?: IUserRepoParams): Promise<IUserModel[]> => {
  const query = queryBuilder({ model: userModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: IUserRepoParams): Promise<IUserModel | null> => {
  const query = queryBuilder({ model: userModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IUserModel): Promise<IUserModel> => {
  return commonRepository.create(data, userModel);
};

const update = (id: string, data: IUserModel): Promise<IUserModel | null> => {
  return commonRepository.findAndUpdate(id, data, userModel);
};

const softDelete = (id: string): Promise<IUserModel | null> => {
  return commonRepository.findAndUpdate(id, { isDeleted: true }, userModel);
};

const deleteOne = (id: string): Promise<IUserModel | null> => {
  return commonRepository.findByIdAndDelete(id, userModel);
};

const userRepository: IUserRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default userRepository;
