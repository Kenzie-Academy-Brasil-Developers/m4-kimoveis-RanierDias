import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategoryPublic, TService } from "../../interfaces";
import { Repository } from "typeorm";
import AppError from "../../error";

export const requestCategoriesList = async (): Promise<ICategoryPublic[]> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);
  const category = await categoryRepo.find();

  return category;
};

export const requestProprietyListCategory: TService<Category, Request> = async (
  payload
) => {
  const id = Number(payload.params.id);
  const realEstateRepo: Repository<Category> =
    AppDataSource.getRepository(Category);
  const proprietyList = await realEstateRepo
    .createQueryBuilder("category")
    .select()
    .innerJoinAndSelect("category.realEstate", "propriety")
    .where("category.id = :categoryId", { categoryId: id })
    .getOne();

  if (!proprietyList) throw new AppError("Category not found", 404);

  return proprietyList;
};
