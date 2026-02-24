import mongoose from 'mongoose';
import IUserModel from '../../interface/user/user.interface';

const userSchema = new mongoose.Schema<IUserModel>(
  {
    _id: {
      type: String,
      default: 'Single_User',
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
  },
  { timestamps: true },
);

export default userSchema;
