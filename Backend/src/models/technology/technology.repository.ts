import { Types } from 'mongoose';
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

const create = (data: ITechnologyModel, createdBy: Types.ObjectId): Promise<ITechnologyModel> => {
  return commonRepository.create({ ...data, createdBy }, technologyModel);
};

const update = (
  id: string,
  data: ITechnologyModel,
  updatedBy: Types.ObjectId,
): Promise<ITechnologyModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, technologyModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<ITechnologyModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    technologyModel,
  );
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
