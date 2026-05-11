import { z } from 'zod';
import { EDeviceType } from '../interface/common/common.enum';

const imageSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().url(),
  alt: z.string().optional(),
});

export const projectCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  image: imageSchema,
  device: z.nativeEnum(EDeviceType),
  year: z.number().int(),
  client: z.string().min(1, 'Client is required'),
  fullDescription: z.string().min(1, 'Full description is required'),
  role: z.string().min(1, 'Role is required'),
  outcome: z.string().min(1, 'Outcome is required'),
  workingUrl: z.string().url(),
  githubUrl: z.string().url(),
  screenshots: z.array(z.string()),
  projectMetric: z.array(z.string()),
  projectTestimonial: z.array(z.string()),
  techStack: z.array(z.string()),
});

export const projectUpdateSchema = projectCreateSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});
