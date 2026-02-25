import { Schema } from 'mongoose';
import IResumeModel from '../../interface/models/resume/resume.interface';

const resumeSchema = new Schema<IResumeModel>(
  {
    name: {
      type: String,
      required: true,
    },
    projectCount: {
      type: Number,
      required: true,
    },
    serviceCount: {
      type: Number,
      required: true,
    },
    technologyCount: {
      type: Number,
      required: true,
    },
    projectsUsed: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
      required: true,
    },
    servicesUsed: {
      type: [Schema.Types.ObjectId],
      ref: 'Service',
      required: true,
    },
    technologiesUsed: {
      type: [Schema.Types.ObjectId],
      ref: 'Technology',
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    resumeFormatUrl: {
      type: String,
      required: false,
    },
    jobUrl: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default resumeSchema;
