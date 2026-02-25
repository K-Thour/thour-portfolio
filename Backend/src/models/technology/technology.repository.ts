import queryBuilder from '../../common/queryBuilder';
import ITechnologyModel from '../../interface/technology/technology.interface';
import {
  ITechnologyRepo,
  ITechnologyRepoParams,
} from '../../interface/technology/technologyRepo.interface';
import commonRepository from '../common/common.repository';
import technologyModel from './technology.model';

const get = (params?: ITechnologyRepoParams): Promise<ITechnologyModel[]> => {
  const query = queryBuilder({ model: technologyModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: ITechnologyRepoParams): Promise<ITechnologyModel | null> => {
  const query = queryBuilder({ model: technologyModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: ITechnologyModel): Promise<ITechnologyModel> => {
  return commonRepository.create(data, technologyModel);
};

const update = (id: string, data: ITechnologyModel): Promise<ITechnologyModel | null> => {
  return commonRepository.findAndUpdate(id, data, technologyModel);
};

const softDelete = (id: string): Promise<ITechnologyModel | null> => {
  return commonRepository.findAndUpdate(id, { isDeleted: true }, technologyModel);
};

const deleteOne = (id: string): Promise<ITechnologyModel | null> => {
  return commonRepository.findByIdAndDelete(id, technologyModel);
};

const technologyRepository: ITechnologyRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default technologyRepository;
