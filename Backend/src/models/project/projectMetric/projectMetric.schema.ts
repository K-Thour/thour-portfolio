import { Schema } from 'mongoose';
import IProjectMetricModel from '../../../interface/models/project/projectMetric/projectMetric.interface';
import timeZone from '../../../utils/date.utils';

const projectMetricSchema = new Schema<IProjectMetricModel>(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { currentTime: () => new Date(timeZone.utc.dateTime() + 'Z') } },
);

export default projectMetricSchema;
