import { Router } from "express";
import {
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
