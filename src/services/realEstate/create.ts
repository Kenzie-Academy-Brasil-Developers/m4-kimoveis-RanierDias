import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../../entities";
import { IRealEstatePublic, TService } from "../../interfaces";
import { realEstateDataPublicSchema } from "../../schemas/realEstate";
import { addressDataPublicSchema } from "../../schemas/address";
import AppError from "../../error";

const requestCreatePropriety: TService<IRealEstatePublic> = async (payload) => {
  const { address: addressPropriety } = payload;
  const addressRepo = AppDataSource.getRepository(Address);
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const address = addressRepo.create(addressPropriety);

  const addressExists = await addressRepo
    .createQueryBuilder("address")
    .where("address.street = :street", { street: addressPropriety.street })
    .andWhere("address.number = :number", { number: addressPropriety.number })
    .getOne();

  if (addressExists) throw new AppError("Address already exists", 409);

  await addressRepo.save(address);

  const category = payload.categoryId;
  delete payload.categoryId;

  const newAddress = addressDataPublicSchema.parse(address);
  const newPropriety = { ...payload, address: newAddress.id, category };

  const propriety = realEstateRepo.create(
    newPropriety
  ) as unknown as RealEstate;

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
