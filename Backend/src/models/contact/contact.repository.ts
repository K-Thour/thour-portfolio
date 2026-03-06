import {
  IContactRepo,
  IContactRepoParams,
} from '../../interface/models/contact/contactRepo.interface';
import commonRepository from '../common/common.repository';
import contactModel from './contact.model';
import { Types } from 'mongoose';
import IContactModel from '../../interface/models/contact/contact.interface';
import queryBuilder from '../../common/queryBuilder';

const get = (params?: IContactRepoParams): Promise<IContactModel[]> => {
  const query = queryBuilder({ model: contactModel, params });
  return commonRepository.find(query);
};

const getOne = (params?: IContactRepoParams): Promise<IContactModel | null> => {
  const query = queryBuilder({ model: contactModel, params });
  return commonRepository.findOne(query);
};

const create = (data: IContactModel): Promise<IContactModel> => {
  return commonRepository.create({ ...data }, contactModel);
};

const update = (
  id: string,
  data: IContactModel,
  updatedBy: Types.ObjectId,
): Promise<IContactModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, contactModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IContactModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    contactModel,
  );
};

const deleteOne = (id: string): Promise<IContactModel | null> => {
  return commonRepository.findByIdAndDelete(id, contactModel);
};

const contactRepository: IContactRepo = {
  get,
  getOne,
  create,
  update,
  softDelete,
  deleteOne,
};

export default contactRepository;
