import { Schema } from 'mongoose';
import IProjectScreenshotModel from '../../../interface/models/project/projectScreenshot/projectScreenshot.interface';
import { imageDataSchema } from '../../common/common.type';
import timeZone from '../../../utils/date.utils';

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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: { currentTime: () => new Date(timeZone.utc.dateTime() + 'Z') } },
);

export default projectScreenshotSchema;
