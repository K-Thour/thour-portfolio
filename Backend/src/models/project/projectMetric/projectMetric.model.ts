import { model } from 'mongoose';
import IProjectMetricModel from '../../../interface/models/project/projectMetric/projectMetric.interface';
import projectMetricSchema from './projectMetric.schema';

const ProjectMetricModel = model<IProjectMetricModel>('ProjectMetric', projectMetricSchema);

export default ProjectMetricModel;
