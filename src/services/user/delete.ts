import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TService } from "../../interfaces";

const requestDeleteUser: TService<void, number> = async (payload) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  await userRepo
    .createQueryBuilder("user")
    .softDelete()
    .where("id = :id", { id: payload })
    .execute();
};

export default requestDeleteUser;
