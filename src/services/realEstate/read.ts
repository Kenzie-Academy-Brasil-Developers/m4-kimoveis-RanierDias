import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const requestProprietyList = async (): Promise<RealEstate[]> => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const propriety = await realEstateRepo
    .createQueryBuilder("propriety")
    .leftJoinAndSelect("propriety.address", "address")
    .getMany();

  return propriety;
};

export default requestProprietyList;
