import { model } from 'mongoose';
import IProjectTestimonialModel from '../../../interface/project/projectTestimonial.ts/projectTestimonial.interface';
import projectTestimonialSchema from './projectTestimonial.schema';

const projectTestimonialModel = model<IProjectTestimonialModel>(
  'ProjectTestimonial',
  projectTestimonialSchema,
);

export default projectTestimonialModel;
