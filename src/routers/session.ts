import { Router } from "express";
import { sessionLogUser } from "../controllers/user";
import { verifyDataBody } from "../middlewares/verify";
import { userDataLogSchema } from "../schemas/user";

const sessionRouter = Router();

sessionRouter.post("", verifyDataBody(userDataLogSchema), sessionLogUser);

export default sessionRouter;
