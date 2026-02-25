import { ICommonModelIndex } from '../../common/common.index';
import IProjectScreenshotModel from '../../../interface/project/projectScreenshot/projectScreenshot.interface';
import projectScreenshotModel from './projectScreenshot.model';
import projectScreenshotSchema from './projectScreenshot.schema';
import projectScreenshotRepo from './projectScreenshot.repository';

export default <ICommonModelIndex<IProjectScreenshotModel>>{
  model: projectScreenshotModel,
  repo: projectScreenshotRepo,
  schema: projectScreenshotSchema,
};
