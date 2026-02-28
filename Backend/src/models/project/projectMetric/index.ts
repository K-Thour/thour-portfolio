import { ICommonModelIndex } from '../../common/common.index';
import IProjectMetricModel from '../../../interface/models/project/projectMetric/projectMetric.interface';
import ProjectMetricModel from './projectMetric.model';
import projectMetricSchema from './projectMetric.schema';
import projectMetricRepo from './projectMetric.repository';

export default <ICommonModelIndex<IProjectMetricModel>>{
  model: ProjectMetricModel,
  repo: projectMetricRepo,
  schema: projectMetricSchema,
};
