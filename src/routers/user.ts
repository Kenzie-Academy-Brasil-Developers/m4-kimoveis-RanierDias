import { Router } from "express";
import {
  verifyEmailExists,
  verifyTokenUser,
  verifyUserExists,
} from "../middlewares/user";
import {
  createUser,
  deleteUser,
  getUsersList,
  updateUser,
} from "../controllers/user";

const userRouter = Router();

userRouter.post("", verifyEmailExists, createUser);
userRouter.get("", verifyTokenUser, getUsersList);
userRouter.patch(
  "/:id",
  verifyUserExists,
  verifyTokenUser,
  verifyEmailExists,
  updateUser
);
userRouter.delete("/:id", verifyUserExists, verifyTokenUser, deleteUser);

export default userRouter;
