import { model } from 'mongoose';
import IProjectMetricModel from '../../../interface/project/projectMetric/projectMetric.interface';
import projectMetricSchema from './projectMetric.schema';

const ProjectMetricModel = model<IProjectMetricModel>('ProjectMetric', projectMetricSchema);

export default ProjectMetricModel;
