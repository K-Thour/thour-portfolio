import { Schema } from 'mongoose';
import ITechnologyModel from '../../interface/models/technology/technology.interface';
import { imageDataSchema } from '../common/common.type';
import timeZone from '../../utils/date.utils';

const technologySchema = new Schema<ITechnologyModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    iconUrl: { type: imageDataSchema, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: () => new Date(timeZone.utc.dateTime() + 'Z') },
    updatedAt: { type: Date, default: () => new Date(timeZone.utc.dateTime() + 'Z') },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: { currentTime: () => new Date(timeZone.utc.dateTime() + 'Z') } },
);

export default technologySchema;
