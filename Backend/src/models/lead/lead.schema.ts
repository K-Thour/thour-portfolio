import { Schema } from 'mongoose';
import ILeadModel from '../../interface/models/lead/lead.interface';
import timeZone from '../../utils/date.utils';

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
    createdAt: { type: Date, default: () => new Date(timeZone.utc.dateTime() + 'Z') },
    updatedAt: { type: Date, default: () => new Date(timeZone.utc.dateTime() + 'Z') },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: { currentTime: () => new Date(timeZone.utc.dateTime() + 'Z') } },
);

export default leadSchema;
