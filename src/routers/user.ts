import { Router } from "express";
import {
  verifyEmailExists,
  verifyTokenUser,
  verifyUserAdmin,
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
userRouter.get("", verifyUserAdmin, getUsersList);
userRouter.patch(
  "/:id",
  verifyUserExists,
  verifyTokenUser,
  verifyEmailExists,
  updateUser
);
userRouter.delete("/:id", verifyUserExists, verifyUserAdmin, deleteUser);

export default userRouter;
