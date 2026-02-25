import { Schema } from 'mongoose';
import { IPortfolioModel } from '../../interface/models/portfolio/portfolio.interface';

const portfolioSchema = new Schema<IPortfolioModel>(
  {
    name: {
      type: String,
      required: true,
    },
    project: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
      default: [],
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
  { timestamps: true },
);

export default portfolioSchema;
