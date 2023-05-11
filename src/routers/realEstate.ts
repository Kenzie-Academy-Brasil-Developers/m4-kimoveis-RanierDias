import { Router } from "express";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/validation";
import { createPropriety, getPorprietyList } from "../controllers/realEstate";
import { verifyDataBody } from "../middlewares/verify";
import { realEstateDataRegisterSchema } from "../schemas/realEstate";

const proprietyRouter = Router();

proprietyRouter.post(
  "",
  verifyTokenUser,
  verifyUserAdmin,
  verifyDataBody(realEstateDataRegisterSchema),
  createPropriety
);
proprietyRouter.get("", getPorprietyList);

export default proprietyRouter;
