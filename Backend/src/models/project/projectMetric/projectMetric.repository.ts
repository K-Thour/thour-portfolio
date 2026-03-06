import { Types } from 'mongoose';
import queryBuilder from '../../../common/queryBuilder';
import IProjectMetricModel from '../../../interface/models/project/projectMetric/projectMetric.interface';
import {
  IProjectMetricRepo,
  IProjectMetricRepoParams,
} from '../../../interface/models/project/projectMetric/projectMetricRepo.interface';
import commonRepository from '../../common/common.repository';
import ProjectMetricModel from './projectMetric.model';

const get = (params?: IProjectMetricRepoParams): Promise<IProjectMetricModel[]> => {
  const query = queryBuilder({ model: ProjectMetricModel, params });
  return commonRepository.find(query);
};

const getOne = (params?: IProjectMetricRepoParams): Promise<IProjectMetricModel | null> => {
  const query = queryBuilder({ model: ProjectMetricModel, params });
  return commonRepository.findOne(query);
};

const create = (
  data: IProjectMetricModel,
  createdBy: Types.ObjectId,
): Promise<IProjectMetricModel> => {
  return commonRepository.create({ ...data, createdBy }, ProjectMetricModel);
};

const update = (
  id: string,
  data: Partial<IProjectMetricModel>,
  updatedBy: Types.ObjectId,
): Promise<IProjectMetricModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, ProjectMetricModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IProjectMetricModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    ProjectMetricModel,
  );
};

const deleteOne = (id: string): Promise<IProjectMetricModel | null> => {
  return commonRepository.findByIdAndDelete(id, ProjectMetricModel);
};

const projectMetricRepo: IProjectMetricRepo = {
  get,
  getOne,
  create,
  update,
  softDelete,
  deleteOne,
};

export default projectMetricRepo;
