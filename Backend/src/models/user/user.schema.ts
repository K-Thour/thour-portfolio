import mongoose from 'mongoose';
import IUserModel from '../../interface/models/user/user.interface';
import { imageDataSchema, languageSchema } from '../common/common.type';

const userSchema = new mongoose.Schema<IUserModel>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId('60d5ec4934d47d2b2c8b4567'),
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: imageDataSchema,
      required: false,
    },
    experience: {
      type: Number,
      required: true,
    },
    completedProjects: {
      type: Number,
      required: true,
    },
    solvedProblems: {
      type: Number,
      required: true,
    },
    happyClients: {
      type: Number,
      required: true,
    },
    InstagramURL: {
      type: String,
      unique: true,
      required: false,
    },
    LinkedInURL: {
      type: String,
      unique: true,
      required: false,
    },
    GitHubURL: {
      type: String,
      unique: true,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    hobbies: {
      type: [String],
      default: [],
    },
    languages: {
      type: [languageSchema],
      default: [],
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiry: {
      type: Date,
      required: false,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpiry: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export default userSchema;
