import { Schema } from 'mongoose';
import IEducationModel from '../../interface/models/education/education.interface';
import {
  EEducationType,
  EGradeType,
  ESchoolBoard,
  EStream,
} from '../../interface/common/common.enum';
import timeZone from '../../utils/date.utils';

const educationShema = new Schema<IEducationModel>(
  {
    level: {
      type: String,
      enum: EEducationType,
      required: true,
    },
    degree: {
      type: String,
      required: false,
    },
    field_of_study: {
      type: String,
      required: false,
    },
    stream: {
      type: String,
      enum: EStream,
      required: false,
    },
    institution: {
      type: String,
      required: true,
    },
    board: {
      type: String,
      enum: ESchoolBoard,
      required: false,
    },
    startYear: {
      type: Date,
      required: true,
    },
    isPursuing: {
      type: Boolean,
      default: false,
    },
    endYear: {
      type: Date,
      required: false,
    },
    gradeType: {
      type: String,
      enum: EGradeType,
      required: true,
    },
    grade: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
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

export default educationShema;
