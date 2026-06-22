import { z } from 'zod';

const imageSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().url(),
  alt: z.string().optional(),
});

export const serviceCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  decription: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()),
  iconUrl: imageSchema,
  mainImageUrl: imageSchema,
  imagesUrl: z.array(imageSchema),
});

export const serviceUpdateSchema = serviceCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });
