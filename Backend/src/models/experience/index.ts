import IExperienceModel from '../../interface/models/experience/experience.interface';
import { ICommonModelIndex } from '../common/common.index';
import experienceModel from './experience.model';
import experienceRepository from './experience.repository';
import experienceSchema from './experience.schema';

export default <ICommonModelIndex<IExperienceModel>>{
  repo: experienceRepository,
  model: experienceModel,
  schema: experienceSchema,
};
