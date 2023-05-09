import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import AppError from "../../error";
import { TService } from "../../interfaces";

const requestGetProprietyListSchedule: TService<RealEstate | null> = async (
  payload
) => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const realEstate = await realEstateRepo
    .createQueryBuilder("propriety")
    .leftJoinAndSelect("propriety.schedules", "schedule")
    .innerJoinAndSelect("schedule.user", "user")
    .leftJoinAndSelect("propriety.category", "category")
    .leftJoinAndSelect("propriety.address", "address")
    .where("propriety.id = :id", { id: payload })
    .getOne();

  if (!realEstate) throw new AppError("RealEstate not found", 404);

  return realEstate;
};

export default requestGetProprietyListSchedule;
