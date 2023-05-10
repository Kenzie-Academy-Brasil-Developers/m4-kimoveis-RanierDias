import { Router } from "express";
import { verifyUserAdmin } from "../middlewares/validation";
import {
  createCategorie,
  getCategoriesList,
  getProprietyListCategory,
} from "../controllers/categories";
import { verifyCategoryExists } from "../middlewares/verify";


const categorieRouter = Router();

categorieRouter.post(
  "",
  verifyCategoryExists,
  verifyUserAdmin,
  createCategorie
);
categorieRouter.get("", getCategoriesList);
categorieRouter.get("/:id/realEstate", getProprietyListCategory);

export default categorieRouter;
