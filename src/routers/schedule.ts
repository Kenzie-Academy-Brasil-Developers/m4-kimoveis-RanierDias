import { Router } from "express";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/validation";
import {
  createSchedule,
  getProprietyListSchedule,
} from "../controllers/schedule";

const scheduleRouter = Router();

scheduleRouter.post("", verifyTokenUser, createSchedule);
scheduleRouter.get(
  "/realEstate/:id",
  verifyUserAdmin,
  getProprietyListSchedule
);

export default scheduleRouter;
