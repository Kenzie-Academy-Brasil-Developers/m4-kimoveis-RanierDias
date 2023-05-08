import { Router } from "express";
import { verifyUserAdmin } from "../middlewares/user";
import {
  createCategorie,
  getCategoriesList,
  getProprietyListCategory,
} from "../controllers/categories";
import { verifyCategoryExists } from "../middlewares/categories";

const categorieRouter = Router();

categorieRouter.post(
  "",
  verifyCategoryExists,
  verifyUserAdmin,
  createCategorie
);
categorieRouter.get("", getCategoriesList);
categorieRouter.get(
  "/:id/realEstate",
  verifyCategoryExists,
  getProprietyListCategory
);

export default categorieRouter;
