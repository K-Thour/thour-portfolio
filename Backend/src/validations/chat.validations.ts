import { z } from 'zod';

export const chatMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message cannot exceed 2000 characters'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model', 'assistant']),
        content: z.string().max(10000, 'History content cannot exceed 10000 characters'),
      }),
    )
    .max(20, 'History cannot exceed 20 messages')
    .optional(),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
