import { Types } from 'mongoose';
import queryBuilder from '../../common/queryBuilder';
import IEducationModel, {
  createEducationInput,
} from '../../interface/models/education/education.interface';
import {
  IEducationRepo,
  IEducationRepoParams,
} from '../../interface/models/education/educationRepo.interface';
import commonRepository from '../common/common.repository';
import educationModel from './education.model';

const get = (params?: IEducationRepoParams): Promise<IEducationModel[]> => {
  const query = queryBuilder({ model: educationModel, params });
  return commonRepository.find(query);
};

const getOne = (params?: IEducationRepoParams): Promise<IEducationModel | null> => {
  const query = queryBuilder({ model: educationModel, params });
  return commonRepository.findOne(query);
};

const create = (
  data: createEducationInput,
  createdBy: Types.ObjectId,
): Promise<IEducationModel> => {
  return commonRepository.create({ ...data, createdBy }, educationModel);
};

const update = (
  id: string,
  data: Partial<IEducationModel>,
  updatedBy: Types.ObjectId,
): Promise<IEducationModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, educationModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IEducationModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    educationModel,
  );
};

const deleteOne = (id: string): Promise<IEducationModel | null> => {
  return commonRepository.findByIdAndDelete(id, educationModel);
};

const educationRepository: IEducationRepo = {
  get,
  getOne,
  create,
  update,
  softDelete,
  deleteOne,
};

export default educationRepository;
