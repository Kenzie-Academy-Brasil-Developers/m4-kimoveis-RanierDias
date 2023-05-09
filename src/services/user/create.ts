import { AppDataSource } from "../../data-source";
import * as crypt from "bcryptjs";
import { User } from "../../entities";
import { IUserPublic, IUserRegister, TService } from "../../interfaces";
import { userDataPublicSchema } from "../../schemas/user";

const requestCreateUser: TService<IUserPublic> = async (
  payload: IUserRegister
) => {
  const { password } = payload;
  const passHash = crypt.hashSync(password, 12);
  const dataUser = { ...payload, password: passHash };

  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(dataUser);

  await userRepo.save(user);

  return userDataPublicSchema.parse(user);
};

export default requestCreateUser;
