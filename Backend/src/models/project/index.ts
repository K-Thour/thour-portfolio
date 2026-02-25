import { ICommonModelIndex } from '../common/common.index';
import IProjectModel from '../../interface/project/project.interface';
import projectModel from './project.model';
import projectRepository from './project.repository';
import projectSchema from './project.schema';

export default <ICommonModelIndex<IProjectModel>>{
  repo: projectRepository,
  model: projectModel,
  schema: projectSchema,
};
