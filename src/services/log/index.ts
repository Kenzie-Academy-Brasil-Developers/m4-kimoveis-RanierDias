import * as crypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { IUserLog, TService } from "../../interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../error";

const requestLogUser: TService<string> = async (payload: IUserLog) => {
  const { email, password } = payload;
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });

  if (!user) throw new AppError("Invalid credentials", 401);

  const verifyPass = crypt.compareSync(password, user.password);

  if (!verifyPass) throw new AppError("Invalid credentials", 401);

  const key = process.env.SECRET_KEY!;
  const token = jwt.sign({ admin: user.admin }, key, {
    subject: String(user.id),
  });

  return token;
};

export default requestLogUser;
