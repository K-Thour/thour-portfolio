import { model } from 'mongoose';
import IProjectModel from '../../interface/project/project.interface';
import projectSchema from './project.schema';

const projectModel = model<IProjectModel>('Project', projectSchema);

export default projectModel;
