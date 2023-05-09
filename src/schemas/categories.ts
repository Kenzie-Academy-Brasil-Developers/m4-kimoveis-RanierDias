import { z } from "zod";

export const categoryDataPublicSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

export const categoryDataRegisterSchema = categoryDataPublicSchema.omit({
  id: true,
});
