import { z } from 'zod';

export const portfolioCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  project: z.array(z.string()),
});

export const portfolioUpdateSchema = portfolioCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });
