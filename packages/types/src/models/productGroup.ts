import { z } from 'zod';

export const ZBaseProductGroup = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export type TBaseProductGroup = z.infer<typeof ZBaseProductGroup>;

export const ZProductGroup = ZBaseProductGroup.extend({
  id: z.string().min(1),

  createdAt: z.number().nullable(),
  updatedAt: z.number().nullable(),
  deletedAt: z.number().nullable(),
});

export type TProductGroup = z.infer<typeof ZProductGroup>;
