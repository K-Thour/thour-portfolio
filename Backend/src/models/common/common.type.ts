import { Schema } from 'mongoose';

const imageDataSchema = new Schema({
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  alt: { type: String },
});

export default imageDataSchema;
