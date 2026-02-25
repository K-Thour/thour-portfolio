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
  },
  { timestamps: true },
);

export default projectTestimonialSchema;
