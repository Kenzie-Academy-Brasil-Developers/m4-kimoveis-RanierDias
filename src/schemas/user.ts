import { z } from "zod";

export const userDataPublicSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.string().datetime().nullish(),
});

export const userDataRegisterSchema = userDataPublicSchema
  .omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true })
  .extend({
    password: z.string().max(120),
  });

export const userDataPrivateSchema = userDataRegisterSchema
  .omit({
    admin: true,
  })
  .partial();

export const userDataLogSchema = userDataRegisterSchema.pick({
  email: true,
  password: true,
});
