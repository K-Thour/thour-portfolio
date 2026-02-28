import { model } from 'mongoose';
import IResumeModel from '../../interface/models/resume/resume.interface';
import resumeSchema from './resume.schema';

const resumeModel = model<IResumeModel>('Resume', resumeSchema);

export default resumeModel;
