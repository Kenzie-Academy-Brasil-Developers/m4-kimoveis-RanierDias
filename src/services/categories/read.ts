import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { ICategoryPublic, TService } from "../../interfaces";

export const requestCategoriesList = async (): Promise<ICategoryPublic[]> => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo.find();

  return category;
};

export const requestProprietyListCategory: TService<RealEstate[]> = async (
  payload
) => {
  const id = Number(payload.params.id);
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const proprietyList = await realEstateRepo
    .createQueryBuilder("propriety")
    .select(
      "propriety.id, propriety.sold, propriety.value, propriety.size, propriety.createdAt, propriety.updatedAt"
    )
    .innerJoinAndSelect("propriety.addressId", "address")
    .where("categoryId = :proprietyId", { proprietyId: id })
    .execute();

  return proprietyList.raw;
};
