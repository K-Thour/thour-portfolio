import { z } from 'zod';

export const experienceCreateSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  field: z.string().min(1, 'Field is required'),
  projectsCompleted: z.array(z.string()),
  description: z.string().min(1, 'Description is required'),
  dateOfJoining: z.coerce.date(),
  dateOfLeaving: z.coerce.date().optional(),
  stillWorking: z.boolean(),
});

export const experienceUpdateSchema = experienceCreateSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});
