import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const requestProprietyList = async (): Promise<RealEstate[]> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const propriety = await realEstateRepo
    .createQueryBuilder("propriety")
    .leftJoinAndSelect("propriety.address", "address")
    .getMany();

  return propriety;
};

export default requestProprietyList;
