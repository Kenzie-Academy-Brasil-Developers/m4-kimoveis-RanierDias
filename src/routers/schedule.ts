import { Router } from "express";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/validation";
import {
  createSchedule,
  getProprietyListSchedule,
} from "../controllers/schedule";
import { verifyDataBody } from "../middlewares/verify";
import { scheduleDataRegisterSchema } from "../schemas/schedule";

const scheduleRouter = Router();

scheduleRouter.post(
  "",
  verifyTokenUser,
  verifyDataBody(scheduleDataRegisterSchema),
  createSchedule
);
scheduleRouter.get(
  "/realEstate/:id",
  verifyTokenUser,
  verifyUserAdmin,
  getProprietyListSchedule
);

export default scheduleRouter;
