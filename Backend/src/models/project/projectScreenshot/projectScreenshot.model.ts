import { model } from 'mongoose';
import IProjectScreenshotModel from '../../../interface/project/projectScreenshot/projectScreenshot.interface';
import projectScreenshotSchema from './projectScreenshot.schema';

const projectScreenshotModel = model<IProjectScreenshotModel>(
  'ProjectScreenshot',
  projectScreenshotSchema,
);

export default projectScreenshotModel;
