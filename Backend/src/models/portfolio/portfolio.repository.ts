import queryBuilder from '../../common/queryBuilder';
import { IPortfolioModel } from '../../interface/models/portfolio/portfolio.interface';
import {
  IPortfolioRepo,
  IPortfolioRepoParams,
} from '../../interface/models/portfolio/portfolioRepo.interface';
import commonRepository from '../common/common.repository';
import portfolioModel from './portfolio.model';
import { Types } from 'mongoose';

const get = (params?: IPortfolioRepoParams): Promise<IPortfolioModel[]> => {
  const query = queryBuilder({ model: portfolioModel, params });
  return commonRepository.find(query);
};

const getById = (id: string, params?: IPortfolioRepoParams): Promise<IPortfolioModel | null> => {
  const query = queryBuilder({ model: portfolioModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IPortfolioModel, createdBy: Types.ObjectId): Promise<IPortfolioModel> => {
  return commonRepository.create({ ...data, createdBy }, portfolioModel);
};

const update = (
  id: string,
  data: IPortfolioModel,
  updatedBy: Types.ObjectId,
): Promise<IPortfolioModel | null> => {
  return commonRepository.findAndUpdate(id, { ...data, updatedBy }, portfolioModel);
};

const softDelete = (
  id: string,
  date: Date,
  deletedBy: Types.ObjectId,
): Promise<IPortfolioModel | null> => {
  return commonRepository.findAndUpdate(
    id,
    { isDeleted: true, deletedAt: date, deletedBy },
    portfolioModel,
  );
};

const deleteOne = (id: string): Promise<IPortfolioModel | null> => {
  return commonRepository.findByIdAndDelete(id, portfolioModel);
};

const portfolioRepository: IPortfolioRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default portfolioRepository;
