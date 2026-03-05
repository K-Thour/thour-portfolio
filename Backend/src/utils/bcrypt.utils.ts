import bcrypt from 'bcrypt';
import env from '../constants/env.constant';

const saltRounds = env.SALT_ROUNDS;
const passwordPEPPER = env.PASSWORD_PEPPER;

export async function hashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error('Password is required');
  }
  if (!saltRounds) {
    throw new Error('SALT_ROUNDS is not defined');
  }
  if (!passwordPEPPER) {
    throw new Error('PASSWORD_PEPPER is not defined');
  }
  return bcrypt.hash(password + passwordPEPPER, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  if (!password) {
    throw new Error('Password is required');
  }
  if (!hashedPassword) {
    throw new Error('Hashed password is required');
  }
  if (!passwordPEPPER) {
    throw new Error('PASSWORD_PEPPER is not defined');
  }
  return bcrypt.compare(password + passwordPEPPER, hashedPassword);
}
