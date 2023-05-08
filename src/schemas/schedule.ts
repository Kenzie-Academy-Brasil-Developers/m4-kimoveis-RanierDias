import { z } from "zod";

export const scheduleDataRegisterSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int().positive(),
});
