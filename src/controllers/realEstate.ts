import { TController } from "../interfaces";
import { realEstateDataRegisterSchema } from "../schemas/realEstate";
import requestCreatePropriety from "../services/realEstate/create";
import requestProprietyList from "../services/realEstate/read";

export const createPropriety: TController = async (req, res) => {
  const payload = realEstateDataRegisterSchema.parse(req.body);
  const propriety = await requestCreatePropriety(payload);

  return res.status(201).json(propriety);
};

export const getPorprietyList: TController = async (req, res) => {
  const listPropriety = await requestProprietyList();

  return res.status(200).json(listPropriety);
};
