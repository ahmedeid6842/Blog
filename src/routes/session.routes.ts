import { Router } from "express";
import {
  loginUserHandler,
  logoutUserHandler,
} from "../controller/session.controller";
import { loginUserSchema } from "../schema/user.schema";
import validateResource from "../middleware/validateResource";

const route = Router();

//DONE: route -> authenticate user and create session
route.post(
  "/login",
  validateResource({ body: loginUserSchema }),
  loginUserHandler
);

//DONE: route -> logout and remove sessions
route.get("/logout", logoutUserHandler);

export default route;
