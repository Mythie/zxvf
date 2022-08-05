import { z } from 'zod';

export const ZBaseDevice = z.object({
  name: z.string().min(1),
  description: z.string(),
  passcode: z.string().min(1),
});

export type TBaseDevice = z.infer<typeof ZBaseDevice>;

export const ZDevice = ZBaseDevice.extend({
  id: z.string().min(1),

  createdAt: z.number().nullable(),
  updatedAt: z.number().nullable(),
  deletedAt: z.number().nullable(),
});

export type TDevice = z.infer<typeof ZDevice>;
