import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import AppError from "../../error";
import { IScheduleRegister } from "../../interfaces";

const requestCreateSchedule = async (
  payload: IScheduleRegister,
  userId: number
): Promise<{ message: string }> => {
  const userRepo = AppDataSource.getRepository(User);
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const scheduleRepo = AppDataSource.getRepository(Schedule);

  const timeReserved: string = payload.hour.split(":")[0];

  if (timeReserved < "08" || timeReserved > "18")
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  const dateReserved = new Date(payload.date).getDay();

  if (dateReserved > 4)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  const user = await userRepo.findOneBy({ id: userId });

  if (!user) throw new AppError("User not found", 404);

  const propriety = await realEstateRepo.findOneBy({
    id: payload.realEstateId,
  });

  if (!propriety) throw new AppError("RealEstate not found", 404);

  const schedulesPropriety = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.hour = :hour", { hour: payload.hour })
    .andWhere("schedule.date = :date", { date: payload.date })
    .andWhere("schedule.realEstate = :realEstateId", {
      realEstateId: payload.realEstateId,
    })
    .getOne();

  if (schedulesPropriety)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  const schedulesUser = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.hour = :hour", { hour: payload.hour })
    .andWhere("schedule.date = :date", { date: payload.date })
    .andWhere("schedule.user = :userId", { userId })
    .getOne();

  if (schedulesUser)
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );

  const schedule = scheduleRepo.create({
    ...payload,
    user: user,
    realEstate: propriety,
  });

  await scheduleRepo.save(schedule);

  return { message: "Schedule created" };
};

export default requestCreateSchedule;
