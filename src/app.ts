import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRouter from "./routers/user";
import { handleError } from "./error";
import sessionRouter from "./routers/session";
import categorieRouter from "./routers/categories";
import proprietyRouter from "./routers/realEstate";

const app = express();

app.use(express.json());

app.use("/login", sessionRouter);
app.use("/users", userRouter);
app.use("/categories", categorieRouter);
app.use("/realEstate", proprietyRouter);

app.use(handleError);

export default app;
