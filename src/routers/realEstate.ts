import { Router } from "express";
import { verifyUserAdmin } from "../middlewares/validation";
import { createPropriety, getPorprietyList } from "../controllers/realEstate";

const proprietyRouter = Router();

proprietyRouter.post("", verifyUserAdmin, createPropriety);
proprietyRouter.get("", getPorprietyList);

export default proprietyRouter;
