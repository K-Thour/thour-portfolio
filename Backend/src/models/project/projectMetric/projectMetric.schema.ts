import { Schema } from 'mongoose';
import IProjectMetricModel from '../../../interface/project/projectMetric/projectMetric.interface';

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
  },
  { timestamps: true },
);

export default projectMetricSchema;
