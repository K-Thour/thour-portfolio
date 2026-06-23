import dotenv from 'dotenv';
import path from 'path';
import { SignOptions } from 'jsonwebtoken';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  SMTP_PORT: Number(process.env.SMTP_PORT || 2525),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'no-reply@portfolio.com',
};
