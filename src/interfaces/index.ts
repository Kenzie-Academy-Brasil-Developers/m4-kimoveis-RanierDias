import { z } from "zod";
import {
  userDataLogSchema,
  userDataPrivateSchema,
  userDataPublicSchema,
  userDataRegisterSchema,
} from "../schemas/user";
import { NextFunction, Request, Response } from "express";
import {
  categoryDataPublicSchema,
  categoryDataRegisterSchema,
} from "../schemas/categories";
import {
  realEstateDataPublicSchema,
  realEstateDataRegisterSchema,
} from "../schemas/realEstate";
import { addressDataPublicSchema } from "../schemas/address";
import { scheduleDataRegisterSchema } from "../schemas/schedule";
import { User } from "../entities";
import { DeepPartial } from "typeorm";

export interface IUserPublic extends z.infer<typeof userDataPublicSchema> {}
export interface IUserPrivate extends z.infer<typeof userDataPrivateSchema> {}
export interface IUserRegister extends z.infer<typeof userDataRegisterSchema> {}
export interface IUserLog extends z.infer<typeof userDataLogSchema> {}

export interface ICategoryPublic
  extends z.infer<typeof categoryDataPublicSchema> {}
export interface ICategoryRegister
  extends z.infer<typeof categoryDataRegisterSchema> {}

export interface IRealEstatePublic
  extends z.infer<typeof realEstateDataPublicSchema> {}
export interface IRealEstateRegister
  extends z.infer<typeof realEstateDataRegisterSchema> {}

export interface IAddressPublic
  extends z.infer<typeof addressDataPublicSchema> {}

export interface IScheduleRegister
  extends z.infer<typeof scheduleDataRegisterSchema> {}

export interface IUserLog extends z.infer<typeof userDataLogSchema> {}

export interface ITokenInfo {
  admin: boolean;
  sub: string;
  iat: number;
}

export type TMiddleware<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

export type TController = (req: Request, res: Response) => Promise<Response>;

export type TService<T, P> = (payload: P) => Promise<T>;
