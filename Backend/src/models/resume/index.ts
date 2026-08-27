import { ICommonModelIndex } from '../common/common.index';
import IResumeModel from '../../interface/models/resume/resume.interface';
import { IResumeRepo } from '../../interface/models/resume/resumeRepo.interface';
import resumeModel from './resume.model';
import resumeRepository from './resume.repository';
import resumeSchema from './resume.schema';

export default <ICommonModelIndex<IResumeModel, IResumeRepo>>{
  model: resumeModel,
  repo: resumeRepository,
  schema: resumeSchema,
};
