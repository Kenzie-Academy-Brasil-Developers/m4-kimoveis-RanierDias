import "dotenv/config";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import AppError from "../error";
import * as jwt from "jsonwebtoken";
import { ITokenInfo, TMiddleware } from "../interfaces";

export const verifyEmailExists: TMiddleware<void> = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next();

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });

  if (user) throw new AppError("Email already exists", 409);

  return next();
};

export const verifyTokenUser: TMiddleware<void> = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) throw new AppError("Missing bearer token", 401);

  const token = auth.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) throw new AppError(err.message, 401);

    const owner = req.params.id == decoded.sub;

    if (!decoded.admin && !owner)
      throw new AppError("Insufficient permission", 403);
  });

  return next();
};

export const verifyUserExists: TMiddleware<void> = async (req, res, next) => {
  const id = Number(req.params.id);
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id });

  if (!user) throw new AppError("User not found", 404);

  res.locals.user = user;

  return next();
};
