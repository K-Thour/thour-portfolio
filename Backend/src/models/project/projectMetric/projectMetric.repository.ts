import queryBuilder from '../../../common/queryBuilder';
import IProjectMetricModel from '../../../interface/project/projectMetric/projectMetric.interface';
import {
  IProjectMetricRepo,
  IProjectMetricRepoParams,
} from '../../../interface/project/projectMetric/projectMetricRepo.interface';
import commonRepository from '../../common/common.repository';
import ProjectMetricModel from './projectMetric.model';

const get = (params?: IProjectMetricRepoParams): Promise<IProjectMetricModel[]> => {
  const query = queryBuilder({ model: ProjectMetricModel, params });
  return commonRepository.find(query);
};

const getById = (
  id: string,
  params?: IProjectMetricRepoParams,
): Promise<IProjectMetricModel | null> => {
  const query = queryBuilder({ model: ProjectMetricModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IProjectMetricModel): Promise<IProjectMetricModel> => {
  return commonRepository.create(data, ProjectMetricModel);
};

const update = (id: string, data: IProjectMetricModel): Promise<IProjectMetricModel | null> => {
  return commonRepository.findAndUpdate(id, data, ProjectMetricModel);
};

const softDelete = (id: string): Promise<IProjectMetricModel | null> => {
  return commonRepository.findAndUpdate(id, { isDeleted: true }, ProjectMetricModel);
};

const deleteOne = (id: string): Promise<IProjectMetricModel | null> => {
  return commonRepository.findByIdAndDelete(id, ProjectMetricModel);
};

const projectMetricRepo: IProjectMetricRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default projectMetricRepo;
