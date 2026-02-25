import { Schema } from 'mongoose';
import IServiceModel from '../../interface/service/service.interface';
import imageDataSchema from '../common/common.type';

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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default serviceSchema;
