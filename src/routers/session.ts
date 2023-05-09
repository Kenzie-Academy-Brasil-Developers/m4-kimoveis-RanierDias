import { Router } from "express";
import { sessionLogUser } from "../controllers/user";

const sessionRouter = Router();

sessionRouter.post("", sessionLogUser);

export default sessionRouter;
