import { z } from 'zod';

export const leadCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().min(1, 'Company name is required'),
  mobileNumber: z.string().min(1, 'Mobile number is required'),
  service: z.string().min(1, 'Service is required'),
  description: z.string().min(1, 'Description is required'),
});

export const leadUpdateSchema = leadCreateSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});
