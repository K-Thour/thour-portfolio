import { z } from 'zod';
import { ELanguageLevel } from '../interface/common/common.enum';

// ─── Shared sub-schemas ────────────────────────────────────────────────────────

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(30, 'Password must be at most 30 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const imageSchema = z.object({
  publicId: z.string().min(1, 'Image public ID is required'),
  url: z.string().url('Image URL must be a valid URL'),
  alt: z.string().optional(),
});

const languageSchema = z.object({
  name: z.string().min(1, 'Language name is required'),
  level: z.nativeEnum(ELanguageLevel, {
    message: `Language level must be one of: ${Object.values(ELanguageLevel).join(', ')}`,
  }),
});

// ─── Create User ───────────────────────────────────────────────────────────────

export const userCreateSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, 'Phone number must be a valid number (7–15 digits)'),
  image: imageSchema.optional(),
  experience: z.number({ message: 'Experience must be a number' }).min(0),
  completedProjects: z.number({ message: 'Completed projects must be a number' }).min(0),
  solvedProblems: z.number({ message: 'Solved problems must be a number' }).min(0),
  happyClients: z.number({ message: 'Happy clients must be a number' }).min(0),
  InstagramURL: z.string().url('Instagram URL must be a valid URL').optional(),
  LinkedInURL: z.string().url('LinkedIn URL must be a valid URL').optional(),
  GitHubURL: z.string().url('GitHub URL must be a valid URL').optional(),
  hobbies: z.array(z.string().min(1)).default([]),
  languages: z.array(languageSchema).default([]),
});

// ─── Update User ───────────────────────────────────────────────────────────────
// All fields optional; password change must be deliberate (separate endpoint recommended)

export const userUpdateSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name must be at most 30 characters long')
      .optional(),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]{7,15}$/, 'Phone number must be a valid number (7–15 digits)')
      .optional(),
    image: imageSchema.optional(),
    experience: z.number({ message: 'Experience must be a number' }).min(0).optional(),
    completedProjects: z
      .number({ message: 'Completed projects must be a number' })
      .min(0)
      .optional(),
    solvedProblems: z.number({ message: 'Solved problems must be a number' }).min(0).optional(),
    happyClients: z.number({ message: 'Happy clients must be a number' }).min(0).optional(),
    InstagramURL: z.string().url('Instagram URL must be a valid URL').optional(),
    LinkedInURL: z.string().url('LinkedIn URL must be a valid URL').optional(),
    GitHubURL: z.string().url('GitHub URL must be a valid URL').optional(),
    hobbies: z.array(z.string().min(1)).optional(),
    languages: z.array(languageSchema).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

// ─── Login ─────────────────────────────────────────────────────────────────────

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
});

// ─── Types (inferred) ──────────────────────────────────────────────────────────

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
