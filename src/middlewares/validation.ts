import AppError from "../error";
import * as jwt from "jsonwebtoken";
import { TMiddleware } from "../interfaces";

export const verifyTokenUser: TMiddleware<void> = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) throw new AppError("Missing bearer token", 401);

  const token = auth.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) throw new AppError(err.message, 401);

    const path = req.baseUrl;
    const owner = path == "/users" ? req.params.id == decoded.sub : true;
    const admin = decoded.admin;

    if (!admin && !owner) throw new AppError("Insufficient permission", 403);

    res.locals.userId = decoded.sub;
  });

  return next();
};

export const verifyUserAdmin: TMiddleware<void> = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) throw new AppError("Missing bearer token", 401);

  const token = auth.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) throw new AppError(err.message, 401);

    const admin = decoded.admin;

    if (!admin) throw new AppError("Insufficient permission", 403);

    res.locals.userId = decoded.sub;
  });

  return next();
};
