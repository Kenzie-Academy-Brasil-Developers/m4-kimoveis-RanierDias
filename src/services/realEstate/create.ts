import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import {
  IRealEstatePublic,
  IRealEstateRegister,
  TService,
} from "../../interfaces";
import { realEstateDataPublicSchema } from "../../schemas/realEstate";
import { addressDataPublicSchema } from "../../schemas/address";
import AppError from "../../error";

const requestCreatePropriety: TService<IRealEstatePublic> = async (
  payload: IRealEstateRegister
) => {
  const { address: addressPropriety } = payload;
  const addressRepo = AppDataSource.getRepository(Address);
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const categoryRepo = AppDataSource.getRepository(Category);
  const address = addressRepo.create(addressPropriety);
  const category = await categoryRepo.findOneBy({
    id: payload.categoryId,
  });

  if (!category) throw new AppError("Category not exists", 404);

  const addressExists = await addressRepo
    .createQueryBuilder("address")
    .where("address.street = :street", { street: addressPropriety.street })
    .andWhere("address.number = :number", { number: addressPropriety.number })
    .getOne();

  if (addressExists) throw new AppError("Address already exists", 409);

  await addressRepo.save(address);

  const newAddress = addressDataPublicSchema.parse(address);
  const propriety = realEstateRepo.create({ ...payload, category, address });

  await realEstateRepo.save(propriety);
  const proprietyInfo = await realEstateRepo
    .createQueryBuilder("propriety")
    .leftJoinAndSelect("propriety.address", "address")
    .leftJoinAndSelect("propriety.category", "category")
    .where("propriety.id = :id", { id: propriety.id })
    .getOne();

  return realEstateDataPublicSchema.parse(proprietyInfo);
};

export default requestCreatePropriety;
