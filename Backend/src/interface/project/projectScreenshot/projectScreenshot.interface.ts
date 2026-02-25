import { ObjectId } from 'mongoose';
import { ICommonModel, IImageData } from '../../common/common.interface';

export interface IProjectScreenshot {
  project_id: ObjectId;
  image: IImageData;
  display_order: number;
  isDeleted: boolean;
}

export interface IProjectScreenshotModel extends IProjectScreenshot, ICommonModel {}

export default IProjectScreenshotModel;
