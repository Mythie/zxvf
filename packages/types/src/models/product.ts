import { z } from 'zod';

export const ZBaseProduct = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number(),
  group: z.string().nullable(),
  images: z.array(z.string()),
  ingredients: z.array(z.string().min(1)),
  modifications: z.array(z.string().min(1)),
});

export type TBaseProduct = z.infer<typeof ZBaseProduct>;

export const ZProduct = ZBaseProduct.extend({
  id: z.string().min(1),

  createdAt: z.number().nullable(),
  updatedAt: z.number().nullable(),
  deletedAt: z.number().nullable(),
});

export type TProduct = z.infer<typeof ZProduct>;
