import { ICommonModelIndex } from '../../common/common.index';
import IProjectTestimonialModel from '../../../interface/models/project/projectTestimonial.ts/projectTestimonial.interface';
import projectTestimonialModel from './projectTestimonial.model';
import projectTestimonialSchema from './projectTestimonial.schema';
import projectTestimonialRepo from './projectTestimonial.repo';

export default <ICommonModelIndex<IProjectTestimonialModel>>{
  model: projectTestimonialModel,
  repo: projectTestimonialRepo,
  schema: projectTestimonialSchema,
};
