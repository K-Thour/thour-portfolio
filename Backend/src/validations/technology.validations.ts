import { z } from 'zod';

// ─── Shared sub-schemas ────────────────────────────────────────────────────────

const imageSchema = z.object({
  publicId: z.string().min(1, 'Image public ID is required'),
  url: z.string().url('Image URL must be a valid URL'),
  alt: z.string().optional(),
});

// ─── Create Technology ─────────────────────────────────────────────────────────

export const technologyCreateSchema = z.object({
  name: z.string().min(1, 'Technology name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  iconUrl: imageSchema,
  isActive: z.boolean().optional(),
});

// ─── Update Technology ─────────────────────────────────────────────────────────

export const technologyUpdateSchema = z
  .object({
    name: z.string().min(1, 'Technology name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    iconUrl: imageSchema.optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

// ─── Types (inferred) ──────────────────────────────────────────────────────────

export type TechnologyCreateInput = z.infer<typeof technologyCreateSchema>;
export type TechnologyUpdateInput = z.infer<typeof technologyUpdateSchema>;
