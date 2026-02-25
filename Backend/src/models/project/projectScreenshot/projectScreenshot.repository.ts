import {
  IProjectScreenshotRepo,
  IProjectScreenshotRepoParams,
} from '../../../interface/project/projectScreenshot/projectScreenshotRepo.interface';
import IProjectScreenshotModel from '../../../interface/project/projectScreenshot/projectScreenshot.interface';
import queryBuilder from '../../../common/queryBuilder';
import commonRepository from '../../common/common.repository';
import projectScreenshotModel from './projectScreenshot.model';

const get = (params?: IProjectScreenshotRepoParams): Promise<IProjectScreenshotModel[]> => {
  const query = queryBuilder({ model: projectScreenshotModel, params });
  return commonRepository.find(query);
};

const getById = (
  id: string,
  params?: IProjectScreenshotRepoParams,
): Promise<IProjectScreenshotModel | null> => {
  const query = queryBuilder({ model: projectScreenshotModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IProjectScreenshotModel): Promise<IProjectScreenshotModel> => {
  return commonRepository.create(data, projectScreenshotModel);
};

const update = (
  id: string,
  data: IProjectScreenshotModel,
): Promise<IProjectScreenshotModel | null> => {
  return commonRepository.findAndUpdate(id, data, projectScreenshotModel);
};

const softDelete = (id: string): Promise<IProjectScreenshotModel | null> => {
  return commonRepository.findAndUpdate(id, { isDeleted: true }, projectScreenshotModel);
};

const deleteOne = (id: string): Promise<IProjectScreenshotModel | null> => {
  return commonRepository.findByIdAndDelete(id, projectScreenshotModel);
};

const projectScreenshotRepo: IProjectScreenshotRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default projectScreenshotRepo;
