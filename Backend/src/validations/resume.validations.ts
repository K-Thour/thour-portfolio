import { z } from 'zod';

export const resumeCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  targetRole: z.string().optional(),
  designType: z.enum(['latex', 'pdf', 'image', 'modern', 'ats']).optional(),
  designFileUrl: z.string().url().optional(),
  projectCount: z.number().int(),
  serviceCount: z.number().int(),
  technologyCount: z.number().int(),
  projectsUsed: z.array(z.string()),
  servicesUsed: z.array(z.string()),
  technologiesUsed: z.array(z.string()),
  resumeUrl: z.string().url(),
  resumeFormatUrl: z.string().url().optional(),
  jobUrl: z.string().url('Please provide a valid URL').optional().or(z.literal('')).or(z.null()),
  latexCode: z.string().optional(),
});

export const resumeGenerateSchema = z.object({
  name: z.string().min(1, 'Resume name is required'),
  description: z.string().min(1, 'Description/focus is required'),
  jobLink: z.string().url('Please provide a valid URL').optional().or(z.literal('')).or(z.null()),
  designType: z.enum(['latex', 'pdf', 'image', 'modern', 'ats']).optional(),
  latexCode: z.string().optional(),
  designFileUrl: z.string().optional(),
  targetRole: z.string().optional(),
  selectedProjectIds: z.array(z.string()).optional(),
  selectedExperienceIds: z.array(z.string()).optional(),
});

export const resumeUpdateSchema = resumeCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });
