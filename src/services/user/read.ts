import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserPublic } from "../../interfaces";

const requesGetUsersList = async (): Promise<IUserPublic[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const usersList = await userRepo
    .createQueryBuilder("user")
    .select(
      "user.id, user.name, user.email, user.admin, user.createdAt, user.updatedAt, user.deletedAt"
    )
    .orderBy("user.id")
    .execute();

  return usersList;
};

export default requesGetUsersList;
