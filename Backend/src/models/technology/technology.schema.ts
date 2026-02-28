import { Schema } from 'mongoose';
import ITechnologyModel from '../../interface/models/technology/technology.interface';
import { imageDataSchema } from '../common/common.type';

const technologySchema = new Schema<ITechnologyModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    iconUrl: { type: imageDataSchema, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default technologySchema;
