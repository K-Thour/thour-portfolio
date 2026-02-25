import { IServiceRepo, IServiceRepoParams } from '../../interface/service/serviceRepo.interface';
import IServiceModel from '../../interface/service/service.interface';
import queryBuilder from '../../common/queryBuilder';
import serviceModel from './service.model';
import commonRepository from '../common/common.repository';
import { Types } from 'mongoose';

const get = (params?: IServiceRepoParams): Promise<IServiceModel[]> => {
  const query = queryBuilder({ model: serviceModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: IServiceRepoParams): Promise<IServiceModel | null> => {
  const query = queryBuilder({ model: serviceModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IServiceModel, createdBy: Types.ObjectId): Promise<IServiceModel> => {
  return commonRepository.create({ ...data, createdBy }, serviceModel);
};

const update = (
  id: string,
  data: IServiceModel,
  updatedBy: Types.ObjectId,
): Promise<IServiceModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, serviceModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IServiceModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    serviceModel,
  );
};

const deleteOne = (id: string): Promise<IServiceModel | null> => {
  return commonRepository.findByIdAndDelete(id, serviceModel);
};

const serviceRepository: IServiceRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default serviceRepository;
