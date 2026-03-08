import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import env from '../constants/env.constant';

const jwtSecret = env.JWT_SECRET;
const expiresIn: SignOptions['expiresIn'] = env.TOKEN_EXPIRY;

export interface TokenPayload {
  id: string;
  sessionId?: string;
}

export function generateToken(payload: TokenPayload): string {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(payload, jwtSecret, {
    expiresIn,
    algorithm: 'HS256',
  });
}

export function generateRandomToken(expirationTime: SignOptions['expiresIn'] = '10m'): string {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({}, jwtSecret, {
    expiresIn: expirationTime,
    algorithm: 'HS256',
  });
}

export function verifyToken(token: string): TokenPayload {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
  const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
  return {
    id: decoded.id as string,
    sessionId: decoded.sessionId as string,
  };
}
