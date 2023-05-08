import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategoryPublic, TService } from "../../interfaces";

export const requestCategoriesList = async (): Promise<ICategoryPublic[]> => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo.find();

  return category;
};

export const requestProprietyListCategory: TService<Category> = async (
  payload
) => {
  const id = Number(payload.params.id);
  const realEstateRepo = AppDataSource.getRepository(Category);
  const proprietyList = await realEstateRepo
    .createQueryBuilder("category")
    .select()
    .innerJoinAndSelect("category.realEstate", "propriety")
    .where("category.id = :categoryId", { categoryId: id })
    .getMany();

  return proprietyList[0];
};
