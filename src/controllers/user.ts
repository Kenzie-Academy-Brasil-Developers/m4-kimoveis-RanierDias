import { User } from "../entities";
import AppError from "../error";
import {
  IUserLog,
  IUserPrivate,
  IUserRegister,
  TController,
} from "../interfaces";
import {
  userDataLogSchema,
  userDataPrivateSchema,
  userDataRegisterSchema,
} from "../schemas/user";
import requestLogUser from "../services/log";
import requestCreateUser from "../services/user/create";
import requestDeleteUser from "../services/user/delete";
import requesGetUsersList from "../services/user/read";
import requestUpdateUser from "../services/user/update";

export const createUser: TController = async (req, res) => {
  const payload: IUserRegister = res.locals.data;
  const user = await requestCreateUser(payload);

  return res.status(201).json(user);
};

export const getUsersList: TController = async (req, res) => {
  const usersList = await requesGetUsersList();

  return res.status(200).json(usersList);
};

export const updateUser: TController = async (req, res) => {
  const payload: IUserPrivate = res.locals.data;
  const userFound: User = res.locals.user;
  const user = await requestUpdateUser(payload, userFound);

  return res.status(200).json(user);
};

export const deleteUser: TController = async (req, res) => {
  const payload = Number(req.params.id);

  await requestDeleteUser(payload);

  return res.status(204).send();
};

export const sessionLogUser: TController = async (req, res) => {
  const payload: IUserLog = res.locals.data;
  const token = await requestLogUser(payload);

  return res.status(200).json({ token });
};
