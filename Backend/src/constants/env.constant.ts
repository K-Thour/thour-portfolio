import { SignOptions } from 'jsonwebtoken';

export default {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
  PORT: process.env.PORT || 3000,
  PASSWORD_PEPPER: process.env.PASSWORD_PEPPER || 'thour',
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS || 10),
  JWT_SECRET: process.env.JWT_SECRET || 'thour',
  TOKEN_EXPIRY: (process.env.TOKEN_EXPIRY as SignOptions['expiresIn']) ?? '1d',
};
