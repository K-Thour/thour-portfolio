import { Schema } from 'mongoose';
import IContactModel from '../../interface/models/contact/contact.interface';
import { EDay } from '../../interface/common/common.enum';

const contactSchema = new Schema<IContactModel>(
  {
    Address1: { type: String, required: true },
    Address2: { type: String },
    startWorkingDay: {
      type: String,
      enum: Object.values(EDay),
      required: true,
    },
    endWorkingDay: {
      type: String,
      enum: Object.values(EDay),
      required: true,
    },
    startWorkingHour: {
      type: String,
      required: true,
    },
    endWorkingHour: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default contactSchema;
