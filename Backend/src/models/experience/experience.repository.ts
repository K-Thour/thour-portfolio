import {
  IExperienceRepo,
  IExperienceRepoParams,
} from '../../interface/models/experience/experienceRepo.interfence';
import { IExperienceModel } from '../../interface/models/experience/experience.interface';
import { Types } from 'mongoose';
import queryBuilder from '../../common/queryBuilder';
import commonRepository from '../common/common.repository';
import experienceModel from './experience.model';

const get = (params?: IExperienceRepoParams): Promise<IExperienceModel[]> => {
  const query = queryBuilder({ model: experienceModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: IExperienceRepoParams): Promise<IExperienceModel | null> => {
  const query = queryBuilder({ model: experienceModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IExperienceModel, createdBy: Types.ObjectId): Promise<IExperienceModel> => {
  return commonRepository.create({ ...data, createdBy }, experienceModel);
};

const update = (
  id: string,
  data: IExperienceModel,
  updatedBy: Types.ObjectId,
): Promise<IExperienceModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, experienceModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IExperienceModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    experienceModel,
  );
};

const deleteOne = (id: string): Promise<IExperienceModel | null> => {
  return commonRepository.findByIdAndDelete(id, experienceModel);
};

const experienceRepository: IExperienceRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default experienceRepository;
