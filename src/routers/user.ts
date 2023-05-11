import { Router } from "express";
import {
  verifyDataBody,
  verifyEmailExists,
  verifyUserExists,
} from "../middlewares/verify";
import {
  createUser,
  deleteUser,
  getUsersList,
  updateUser,
} from "../controllers/user";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/validation";
import { userDataPrivateSchema, userDataRegisterSchema } from "../schemas/user";

const userRouter = Router();

userRouter.post(
  "",
  verifyEmailExists,
  verifyDataBody(userDataRegisterSchema),
  createUser
);
userRouter.get("", verifyTokenUser, verifyUserAdmin, getUsersList);
userRouter.patch(
  "/:id",
  verifyUserExists,
  verifyTokenUser,
  verifyEmailExists,
  verifyDataBody(userDataPrivateSchema),
  updateUser
);
userRouter.delete(
  "/:id",
  verifyUserExists,
  verifyTokenUser,
  verifyUserAdmin,
  deleteUser
);

export default userRouter;
