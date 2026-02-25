import { IServiceRepo, IServiceRepoParams } from '../../interface/service/serviceRepo.interface';
import IServiceModel from '../../interface/service/service.interface';
import queryBuilder from '../../common/queryBuilder';
import serviceModel from './service.model';
import commonRepository from '../common/common.repository';

const get = (params?: IServiceRepoParams): Promise<IServiceModel[]> => {
  const query = queryBuilder({ model: serviceModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: IServiceRepoParams): Promise<IServiceModel | null> => {
  const query = queryBuilder({ model: serviceModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IServiceModel): Promise<IServiceModel> => {
  return commonRepository.create(data, serviceModel);
};

const update = (id: string, data: IServiceModel): Promise<IServiceModel | null> => {
  return commonRepository.findAndUpdate(id, data, serviceModel);
};

const softDelete = (id: string): Promise<IServiceModel | null> => {
  return commonRepository.findAndUpdate(id, { isDeleted: true }, serviceModel);
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
