import { Schema } from 'mongoose';
import IProjectTestimonialModel from '../../../interface/project/projectTestimonial.ts/projectTestimonial.interface';

const projectTestimonialSchema = new Schema<IProjectTestimonialModel>(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    author_role: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default projectTestimonialSchema;
