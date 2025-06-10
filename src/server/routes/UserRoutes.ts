import bodyParser from "body-parser";
import { Router } from "express";
import { createUser, deleteUser, editUser, login, viewUserPrivate, viewUserPublic } from "../controllers/UserController.ts";
import { authorize } from "../middleware/auth.ts";

export const userRouter = Router();

userRouter.post("/", bodyParser.json(), createUser); //name, email, password

userRouter.post("/login", bodyParser.json(), login); //email, password

userRouter.get("/:id", viewUserPublic);

userRouter.post("/:id", authorize, viewUserPrivate);

userRouter.patch("/:id", bodyParser.json(), authorize, editUser); //name?, email?, password?

userRouter.delete("/:id", authorize, deleteUser);