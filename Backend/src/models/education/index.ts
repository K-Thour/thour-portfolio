import { ICommonModelIndex } from '../common/common.index';
import IEducationModel from '../../interface/models/education/education.interface';
import educationModel from './education.model';
import educationRepository from './education.repository';
import educationSchema from './education.schema';

export default <ICommonModelIndex<IEducationModel>>{
  repo: educationRepository,
  model: educationModel,
  schema: educationSchema,
};
