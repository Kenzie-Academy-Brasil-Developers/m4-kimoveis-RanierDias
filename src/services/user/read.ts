import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserPublic } from "../../interfaces";
import { userDataPublicSchema } from "../../schemas/user";

const requesGetUsersList = async (): Promise<IUserPublic[]> => {
  const userRepo = AppDataSource.getRepository(User);

  const usersList2 = (await userRepo.find()).map(user => userDataPublicSchema.parse(user)); //rever essa parte

  return usersList2;
};

export default requesGetUsersList;
