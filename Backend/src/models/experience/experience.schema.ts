import { Schema } from 'mongoose';
import IExperienceModel from '../../interface/models/experience/experience.interface';
import timeZone from '../../utils/date.utils';

const experienceSchema = new Schema<IExperienceModel>(
  {
    companyName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    projectsCompleted: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    dateOfLeaving: {
      type: Date,
      required: false,
    },
    stillWorking: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: { currentTime: () => new Date(timeZone.utc.dateTime() + 'Z') } },
);

export default experienceSchema;
