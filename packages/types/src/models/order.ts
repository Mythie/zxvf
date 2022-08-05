import { z } from 'zod';

import { ZProduct } from './product';

export const ZBaseOrder = z.object({
  price: z.number(),
  discount: z.number(),
  tax: z.number(),
  paymentMethod: z.string().min(1),
  products: z.array(ZProduct),
});

export type TBaseOrder = z.infer<typeof ZBaseOrder>;

export const ZOrder = z.object({
  id: z.string().min(1),

  createdAt: z.number().nullable(),
  updatedAt: z.number().nullable(),
  deletedAt: z.number().nullable(),
});

export type TOrder = z.infer<typeof ZOrder>;
