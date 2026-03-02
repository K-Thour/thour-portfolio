import { model } from 'mongoose';
import IExperienceModel from '../../interface/models/experience/experience.interface';
import experienceSchema from './experience.schema';

const experienceModel = model<IExperienceModel>('Experience', experienceSchema);

export default experienceModel;
