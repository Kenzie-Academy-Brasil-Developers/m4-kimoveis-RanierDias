import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserPublic } from "../../interfaces";
import { userListPublicSchema } from "../../schemas/user";

const requesGetUsersList = async (): Promise<IUserPublic[]> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const usersList = await userRepo.find();

  return userListPublicSchema.parse(usersList);
};

export default requesGetUsersList;
