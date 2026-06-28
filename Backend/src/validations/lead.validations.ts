import { z } from 'zod';

export const leadCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().optional(),
  mobileNumber: z.string().optional(),
  service: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Lost', 'Won']).optional(),
  statusMessage: z.string().optional(),
});

export const leadUpdateSchema = leadCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });
