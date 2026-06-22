import { z } from 'zod';
import { EDay } from '../interface/common/common.enum';

export const contactCreateSchema = z.object({
  Address1: z.string().min(1, 'Address 1 is required'),
  Address2: z.string().optional(),
  startWorkingDay: z.nativeEnum(EDay),
  endWorkingDay: z.nativeEnum(EDay),
  startWorkingHour: z.string().min(1, 'Start working hour is required'),
  endWorkingHour: z.string().min(1, 'End working hour is required'),
});

export const contactUpdateSchema = contactCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });
