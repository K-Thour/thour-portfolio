import 'dotenv/config';
import { SignOptions } from 'jsonwebtoken';

export default {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
  PORT: process.env.PORT || 3000,
  PASSWORD_PEPPER: process.env.PASSWORD_PEPPER || 'thour',
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS || 10),
  JWT_SECRET: process.env.JWT_SECRET || 'thour',
  TOKEN_EXPIRY: (process.env.TOKEN_EXPIRY as SignOptions['expiresIn']) ?? '1d',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  SEED_EMAIL: process.env.SEED_EMAIL || 'admin@portfolio.com',
  SEED_PASSWORD: process.env.SEED_PASSWORD || 'Password123!',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};
