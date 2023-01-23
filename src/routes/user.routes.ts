import { Router } from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema, getUserQuery } from "../schema/user.schema";
import {
  createUserHandler,
  getUserHandler,
} from "../controller/user.controller";

const route = Router();

//DONE: route -> create new user
route.post(
  "/",
  validateResource({ body: createUserSchema }),
  createUserHandler
);

//DONE: route[query] -> get user by name or id
route.get("/", validateResource({ query: getUserQuery }), getUserHandler);

export default route;
