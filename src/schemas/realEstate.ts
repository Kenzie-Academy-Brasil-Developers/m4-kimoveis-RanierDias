import { z } from "zod";

export const realEstateDataPublicSchema = z.object({
  id: z.number(),
  sold: z.boolean(),
  value: z.number().positive().or(z.string()),
  size: z.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: z.object({
    id: z.number().int(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  category: z.object({
    id: z.number().int(),
    name: z.string(),
  }),
});

export const realEstateDataRegisterSchema = realEstateDataPublicSchema
  .pick({
    value: true,
    size: true,
  })
  .extend({
    address: z.object({
      street: z.string().max(45),
      zipCode: z.string().max(8),
      number: z.string().max(7).nullish(),
      city: z.string().max(20),
      state: z.string().max(2),
    }),
    categoryId: z.number().int(),
  });

export const realEstateDataPrivateSchema = realEstateDataPublicSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    sold: true,
  })
  .partial();
