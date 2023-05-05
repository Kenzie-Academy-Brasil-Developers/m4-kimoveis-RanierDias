import { TController } from "../interfaces";
import { categoryDataRegisterSchema } from "../schemas/categories";
import requestCreateCategorie from "../services/categories/create";
import {
  requestCategoriesList,
  requestProprietyListCategory,
} from "../services/categories/read";

export const createCategorie: TController = async (req, res) => {
  const payload = categoryDataRegisterSchema.parse(req.body);
  const categorie = await requestCreateCategorie(payload);

  return res.status(201).json(categorie);
};

export const getCategoriesList: TController = async (req, res) => {
  const categoriesList = await requestCategoriesList();

  return res.status(200).json(categoriesList);
};

export const getProprietyListCategory: TController = async (req, res) => {
  const proprietyList = await requestProprietyListCategory(req);

  return res.status(200).json(proprietyList);
};
