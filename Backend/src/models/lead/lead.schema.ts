import { Schema } from 'mongoose';
import ILeadModel from '../../interface/models/lead/lead.interface';

const leadSchema = new Schema<ILeadModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    description: { type: String, required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default leadSchema;
