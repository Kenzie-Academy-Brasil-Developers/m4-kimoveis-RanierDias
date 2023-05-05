import { Router } from "express";
import { verifyTokenUser } from "../middlewares/user";
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
  verifyTokenUser,
  createCategorie
);
categorieRouter.get("", getCategoriesList);
categorieRouter.get(
  "/:id/realEstate",
  verifyCategoryExists,
  getProprietyListCategory
);

export default categorieRouter;
