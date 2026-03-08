import { Schema } from 'mongoose';
import IServiceModel from '../../interface/models/service/service.interface';
import { imageDataSchema } from '../common/common.type';
import timeZone from '../../utils/date.utils';

const serviceSchema = new Schema<IServiceModel>(
  {
    name: { type: String, required: true },
    decription: { type: String, required: true },
    technologies: { type: [Schema.Types.ObjectId], ref: 'Technology' },
    iconUrl: { type: imageDataSchema, required: true },
    mainImageUrl: { type: imageDataSchema, required: true },
    imagesUrl: { type: [imageDataSchema], required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: () => new Date(timeZone.utc.dateTime() + 'Z') },
    updatedAt: { type: Date, default: () => new Date(timeZone.utc.dateTime() + 'Z') },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: { currentTime: () => new Date(timeZone.utc.dateTime() + 'Z') } },
);

export default serviceSchema;
