import { IProjectRepo, IProjectRepoParams } from '../../interface/project/projectRepo.interface';
import { IProjectModel } from '../../interface/project/project.interface';
import projectModel from './project.model';
import commonRepository from '../common/common.repository';
import queryBuilder from '../../common/queryBuilder';
import projectScreenshot from './projectScreenshot';
import projectMetric from './projectMetric';
import projectTestimonial from './projectTestimonial';
import { Types } from 'mongoose';

const get = (params?: IProjectRepoParams): Promise<IProjectModel[]> => {
  const query = queryBuilder({ model: projectModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: IProjectRepoParams): Promise<IProjectModel | null> => {
  const query = queryBuilder({ model: projectModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IProjectModel, createdBy: Types.ObjectId): Promise<IProjectModel> => {
  return commonRepository.create({ ...data, createdBy }, projectModel);
};

const update = (
  id: string,
  data: IProjectModel,
  updatedBy: Types.ObjectId,
): Promise<IProjectModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, projectModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IProjectModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    projectModel,
  );
};

const deleteOne = (id: string): Promise<IProjectModel | null> => {
  return commonRepository.findByIdAndDelete(id, projectModel);
};

const projectRepository: IProjectRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
  projectScreenshotRepo: projectScreenshot.repo,
  projectMetricRepo: projectMetric.repo,
  projectTestimonialRepo: projectTestimonial.repo,
};

export default projectRepository;
