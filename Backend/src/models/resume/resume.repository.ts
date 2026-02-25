import { Types } from 'mongoose';
import queryBuilder from '../../common/queryBuilder';
import IResumeModel from '../../interface/models/resume/resume.interface';
import { IResumeRepo, IResumeRepoParams } from '../../interface/models/resume/resumeRepo.interface';
import commonRepository from '../common/common.repository';
import resumeModel from './resume.model';

const get = (params?: IResumeRepoParams): Promise<IResumeModel[]> => {
  const query = queryBuilder({ model: resumeModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: IResumeRepoParams): Promise<IResumeModel | null> => {
  const query = queryBuilder({ model: resumeModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IResumeModel, createdBy: Types.ObjectId): Promise<IResumeModel> => {
  return commonRepository.create({ ...data, createdBy }, resumeModel);
};

const update = (
  id: string,
  data: IResumeModel,
  updatedBy: Types.ObjectId,
): Promise<IResumeModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, resumeModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IResumeModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    resumeModel,
  );
};

const deleteOne = (id: string): Promise<IResumeModel | null> => {
  return commonRepository.findByIdAndDelete(id, resumeModel);
};

const resumeRepository: IResumeRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default resumeRepository;
