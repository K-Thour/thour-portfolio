import queryBuilder from '../../common/queryBuilder';
import { ILeadRepo, ILeadRepoParams } from '../../interface/models/lead/leadRepo.interface';
import commonRepository from '../common/common.repository';
import leadModel from './lead.model';
import { Types } from 'mongoose';
import ILeadModel from '../../interface/models/lead/lead.interface';

const get = (params?: ILeadRepoParams): Promise<ILeadModel[]> => {
  const query = queryBuilder({ model: leadModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: ILeadRepoParams): Promise<ILeadModel | null> => {
  const query = queryBuilder({ model: leadModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: ILeadModel): Promise<ILeadModel> => {
  return commonRepository.create({ ...data }, leadModel);
};

const update = (
  id: string,
  data: ILeadModel,
  updatedBy: Types.ObjectId,
): Promise<ILeadModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, leadModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<ILeadModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    leadModel,
  );
};

const deleteOne = (id: string): Promise<ILeadModel | null> => {
  return commonRepository.findByIdAndDelete(id, leadModel);
};

const leadRespository: ILeadRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default leadRespository;
