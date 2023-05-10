import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import * as crypt from "bcryptjs";
import { userDataPublicSchema } from "../../schemas/user";
import { IUserPrivate, IUserPublic } from "../../interfaces";
import { Repository } from "typeorm";


const requestUpdateUser = async (
  payload: IUserPrivate,
  userFound: User
): Promise<IUserPublic> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const userData = { ...userFound, ...payload } as User;
  const user = userRepo.create(userData);

  await userRepo.save(user);

  return userDataPublicSchema.parse(user);
};

export default requestUpdateUser;
