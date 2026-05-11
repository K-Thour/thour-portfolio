import { z } from 'zod';

export const resumeCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  projectCount: z.number().int(),
  serviceCount: z.number().int(),
  technologyCount: z.number().int(),
  projectsUsed: z.array(z.string()),
  servicesUsed: z.array(z.string()),
  technologiesUsed: z.array(z.string()),
  resumeUrl: z.string().url(),
  resumeFormatUrl: z.string().url().optional(),
  jobUrl: z.string().url().optional(),
});

export const resumeUpdateSchema = resumeCreateSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});
