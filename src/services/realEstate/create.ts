import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../../entities";
import { IRealEstatePublic, TService } from "../../interfaces";
import { realEstateDataPublicSchema } from "../../schemas/realEstate";
import { addressDataPublicSchema } from "../../schemas/address";

const requestCreatePropriety: TService<IRealEstatePublic> = async (payload) => {
  const { address: addressPropriety } = payload;
  const addressRepo = AppDataSource.getRepository(Address);
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const address = addressRepo.create(addressPropriety);

  await addressRepo.save(address);

  const newAddress = addressDataPublicSchema.parse(address);
  const newPropriety = { ...payload, address: newAddress.id };

  const propriety = realEstateRepo.create(newPropriety);

  await realEstateRepo.save(propriety);

  return realEstateDataPublicSchema.parse(propriety);
};

export default requestCreatePropriety;
