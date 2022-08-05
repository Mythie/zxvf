import { z } from 'zod';

export const ZCustomer = z.object({
  id: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  password: z.string().min(1),
});

export type TCustomer = z.infer<typeof ZCustomer>;
