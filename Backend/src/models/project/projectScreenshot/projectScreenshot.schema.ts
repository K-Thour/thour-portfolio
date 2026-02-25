import { Schema } from 'mongoose';
import IProjectScreenshotModel from '../../../interface/project/projectScreenshot/projectScreenshot.interface';
import imageDataSchema from '../../common/common.type';

const projectScreenshotSchema = new Schema<IProjectScreenshotModel>(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    image: {
      type: imageDataSchema,
      required: true,
    },
    display_order: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default projectScreenshotSchema;
