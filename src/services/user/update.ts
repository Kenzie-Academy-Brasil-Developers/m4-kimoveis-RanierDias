import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import * as crypt from "bcryptjs";
import { userDataPublicSchema } from "../../schemas/user";
import { IUserPublic } from "../../interfaces";

const requestUpdateUser = async (
  payload: any,
  userFound: User
): Promise<IUserPublic> => {
  const { password } = payload;
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ ...userFound, ...payload });

  if (password) {
    const passHash = crypt.hashSync(password, 12);
    const dataUser = { ...user, password: passHash };

    await userRepo.save(dataUser);

    return userDataPublicSchema.parse(dataUser);
  }

  await userRepo.save(user);

  return userDataPublicSchema.parse(user);
};

export default requestUpdateUser;
