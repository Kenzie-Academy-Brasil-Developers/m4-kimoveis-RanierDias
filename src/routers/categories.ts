import { Router } from "express";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/validation";
import {
  createCategorie,
  getCategoriesList,
  getProprietyListCategory,
} from "../controllers/categories";
import { verifyCategoryExists, verifyDataBody } from "../middlewares/verify";
import { categoryDataRegisterSchema } from "../schemas/categories";

const categorieRouter = Router();

categorieRouter.post(
  "",
  verifyCategoryExists,
  verifyTokenUser,
  verifyUserAdmin,
  verifyDataBody(categoryDataRegisterSchema),
  createCategorie
);
categorieRouter.get("", getCategoriesList);
categorieRouter.get("/:id/realEstate", getProprietyListCategory);

export default categorieRouter;
