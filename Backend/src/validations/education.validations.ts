import { z } from 'zod';
import { EEducationType, EGradeType, ESchoolBoard, EStream } from '../interface/common/common.enum';

export const educationCreateSchema = z.object({
  level: z.nativeEnum(EEducationType),
  degree: z.string().optional(),
  field_of_study: z.string().optional(),
  stream: z.nativeEnum(EStream).optional(),
  institution: z.string().min(1, 'Institution is required'),
  board: z.nativeEnum(ESchoolBoard).optional(),
  startYear: z.coerce.date(),
  endYear: z.union([z.coerce.date(), z.literal('pursuing')]),
  isPursuing: z.boolean(),
  gradeType: z.nativeEnum(EGradeType),
  grade: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
});

export const educationUpdateSchema = educationCreateSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});
