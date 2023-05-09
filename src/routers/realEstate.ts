import { Router } from "express";
import { verifyUserAdmin } from "../middlewares/user";
import { createPropriety, getPorprietyList } from "../controllers/realEstate";

const proprietyRouter = Router();

proprietyRouter.post("", verifyUserAdmin, createPropriety);
proprietyRouter.get("", getPorprietyList);

export default proprietyRouter;
