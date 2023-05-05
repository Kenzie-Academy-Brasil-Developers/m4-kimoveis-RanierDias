import { Router } from "express";
import { verifyTokenUser } from "../middlewares/user";
import { createPropriety, getPorprietyList } from "../controllers/realEstate";

const proprietyRouter = Router();

proprietyRouter.post("", verifyTokenUser, createPropriety);
proprietyRouter.get("", getPorprietyList);

export default proprietyRouter;
