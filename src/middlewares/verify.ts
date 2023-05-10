import "dotenv/config";
import { AppDataSource } from "../data-source";
import { Category, User } from "../entities";
import AppError from "../error";
import * as jwt from "jsonwebtoken";
import { TMiddleware } from "../interfaces";
import { Repository } from "typeorm";

export const verifyEmailExists: TMiddleware<void> = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next();

  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });

  if (user) throw new AppError("Email already exists", 409);

  return next();
};

export const verifyUserExists: TMiddleware<void> = async (req, res, next) => {
  const id = Number(req.params.id);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id });

  if (!user) throw new AppError("User not found", 404);

  res.locals.user = user;

  return next();
};

export const verifyCategoryExists: TMiddleware<void> = async (
  req,
  res,
  next
) => {
  const { name } = req.body;
  const pathList = req.path;
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = await categoryRepo.findOneBy({ name });

  if (category) throw new AppError("Category already exists", 409);

  return next();
};
