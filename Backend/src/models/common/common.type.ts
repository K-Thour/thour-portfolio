import { Schema } from 'mongoose';
import { ELanguageLevel } from '../../interface/common/common.enum';

export const imageDataSchema = new Schema({
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  alt: { type: String },
});

export const languageSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ELanguageLevel, required: true },
});
