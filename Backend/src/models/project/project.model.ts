import { model } from 'mongoose';
import IProjectModel from '../../interface/models/project/project.interface';
import projectSchema from './project.schema';

const projectModel = model<IProjectModel>('Project', projectSchema);

export default projectModel;
