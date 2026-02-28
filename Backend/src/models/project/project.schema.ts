import { Schema, Types } from 'mongoose';
import IProjectModel from '../../interface/models/project/project.interface';
import { imageDataSchema } from '../common/common.type';
import { EDeviceType } from '../../interface/common/common.enum';

const projectSchema = new Schema<IProjectModel>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: 'service',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: imageDataSchema,
      required: true,
    },
    device: {
      type: String,
      enum: EDeviceType,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    workingUrl: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    screenshots: {
      type: [Types.ObjectId],
      ref: 'image',
      required: true,
    },
    projectMetric: {
      type: [Types.ObjectId],
      ref: 'ProjectMetric',
      required: true,
    },
    projectTestimonial: {
      type: [Types.ObjectId],
      ref: 'ProjectTestimonial',
      required: true,
    },
    techStack: {
      type: [Types.ObjectId],
      ref: 'Technology',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedBy: {
      type: Types.ObjectId,
      ref: 'user',
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: 'user',
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default projectSchema;
