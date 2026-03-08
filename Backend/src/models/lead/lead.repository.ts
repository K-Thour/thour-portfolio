import queryBuilder from '../../common/queryBuilder';
import { ILeadRepo, ILeadRepoParams } from '../../interface/models/lead/leadRepo.interface';
import commonRepository from '../common/common.repository';
import leadModel from './lead.model';
import { Types } from 'mongoose';
import ILeadModel, { createLeadInput } from '../../interface/models/lead/lead.interface';

const get = (params?: ILeadRepoParams): Promise<ILeadModel[]> => {
  const query = queryBuilder({ model: leadModel, params });
  return commonRepository.find(query);
};

const getOne = (params?: ILeadRepoParams): Promise<ILeadModel | null> => {
  const query = queryBuilder({ model: leadModel, params });
  return commonRepository.findOne(query);
};

const create = (data: createLeadInput): Promise<ILeadModel> => {
  return commonRepository.create({ ...data }, leadModel);
};

const update = (
  id: string,
  data: Partial<ILeadModel>,
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
  getOne,
  create,
  update,
  softDelete,
  deleteOne,
};

export default leadRespository;
