import { z } from "zod";

export const realEstateDataPublicSchema = z.object({
  id: z.number(),
  sold: z.boolean(),
  value: z.number(),
  size: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  address: z.number(),
  category: z.number(),
});

export const realEstateDataRegisterSchema = realEstateDataPublicSchema
  .omit({
    id: true,
    sold: true,
    address: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    address: z.object({
      street: z.string().max(45),
      zipCode: z.string().max(8),
      number: z.string().max(7).nullish(),
      city: z.string().max(20),
      state: z.string().max(2),
    }),
  });

export const realEstateDataPrivateSchema = realEstateDataPublicSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    sold: true,
  })
  .partial();
