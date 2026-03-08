import {
  IProjectScreenshotRepo,
  IProjectScreenshotRepoParams,
} from '../../../interface/models/project/projectScreenshot/projectScreenshotRepo.interface';
import IProjectScreenshotModel, {
  createProjectScreenshotInput,
} from '../../../interface/models/project/projectScreenshot/projectScreenshot.interface';
import queryBuilder from '../../../common/queryBuilder';
import commonRepository from '../../common/common.repository';
import projectScreenshotModel from './projectScreenshot.model';
import { Types } from 'mongoose';

const get = (params?: IProjectScreenshotRepoParams): Promise<IProjectScreenshotModel[]> => {
  const query = queryBuilder({ model: projectScreenshotModel, params });
  return commonRepository.find(query);
};

const getOne = (params?: IProjectScreenshotRepoParams): Promise<IProjectScreenshotModel | null> => {
  const query = queryBuilder({ model: projectScreenshotModel, params });
  return commonRepository.findOne(query);
};

const create = (
  data: createProjectScreenshotInput,
  createdBy: Types.ObjectId,
): Promise<IProjectScreenshotModel> => {
  return commonRepository.create({ ...data, createdBy }, projectScreenshotModel);
};

const update = (
  id: string,
  data: Partial<IProjectScreenshotModel>,
  updatedBy: Types.ObjectId,
): Promise<IProjectScreenshotModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, projectScreenshotModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IProjectScreenshotModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    projectScreenshotModel,
  );
};

const deleteOne = (id: string): Promise<IProjectScreenshotModel | null> => {
  return commonRepository.findByIdAndDelete(id, projectScreenshotModel);
};

const projectScreenshotRepo: IProjectScreenshotRepo = {
  get,
  getOne,
  create,
  update,
  softDelete,
  deleteOne,
};

export default projectScreenshotRepo;
