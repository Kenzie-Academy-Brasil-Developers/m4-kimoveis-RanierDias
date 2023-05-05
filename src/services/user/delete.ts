import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TService } from "../../interfaces";

const requestDeleteUser: TService<void> = async (payload) => {
  const userRepo = AppDataSource.getRepository(User);
  await userRepo
    .createQueryBuilder("user")
    .softDelete()
    .where("id = :id", { id: payload })
    .execute();
};

export default requestDeleteUser;
