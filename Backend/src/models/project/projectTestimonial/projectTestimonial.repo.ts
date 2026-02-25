import {
  IProjectTestimonialRepo,
  IProjectTestimonialRepoParams,
} from '../../../interface/project/projectTestimonial.ts/projectTestimonialRepo.interface';
import commonRepository from '../../common/common.repository';
import queryBuilder from '../../../common/queryBuilder';
import projectTestimonialModel from './projectTestimonial.model';
import IProjectTestimonialModel from '../../../interface/project/projectTestimonial.ts/projectTestimonial.interface';

const get = (params?: IProjectTestimonialRepoParams): Promise<IProjectTestimonialModel[]> => {
  const query = queryBuilder({ model: projectTestimonialModel, params });
  return commonRepository.find(query);
};

const getById = (
  id: string,
  params?: IProjectTestimonialRepoParams,
): Promise<IProjectTestimonialModel | null> => {
  const query = queryBuilder({ model: projectTestimonialModel, params });
  return commonRepository.findById(id, query);
};

const create = (data: IProjectTestimonialModel): Promise<IProjectTestimonialModel> => {
  return commonRepository.create(data, projectTestimonialModel);
};

const update = (
  id: string,
  data: IProjectTestimonialModel,
): Promise<IProjectTestimonialModel | null> => {
  return commonRepository.findAndUpdate(id, data, projectTestimonialModel);
};

const softDelete = (id: string): Promise<IProjectTestimonialModel | null> => {
  return commonRepository.findAndUpdate(id, { isDeleted: true }, projectTestimonialModel);
};

const deleteOne = (id: string): Promise<IProjectTestimonialModel | null> => {
  return commonRepository.findByIdAndDelete(id, projectTestimonialModel);
};

const projectTestimonialRepo: IProjectTestimonialRepo = {
  get,
  getById,
  create,
  update,
  softDelete,
  deleteOne,
};

export default projectTestimonialRepo;
