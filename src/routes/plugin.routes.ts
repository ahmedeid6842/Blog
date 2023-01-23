import { Router } from "express";
import {
  ceatePluginHandler,
  getPluginHandler,
  deletePluginHandler,
} from "../controller/plugin.controller";
import { isAuth } from "../middleware/isAuth";
import validateResource from "../middleware/validateResource";
import {
  createPluginSchema,
  getPluginQuery,
  deletePluginParams,
} from "../schema/plugin.schema";

const route = Router();

//DONE: route -> create a new plugin , autheticated user
route.post(
  "/",
  isAuth,
  validateResource({ body: createPluginSchema }),
  ceatePluginHandler
);

//DONE: route[query] -> get pulgin by title or id or author
route.get("/", validateResource({ query: getPluginQuery }), getPluginHandler);

//DONE: route[params] -> delete plugin by it's id , authorized user
route.delete(
  "/:id",
  isAuth,
  validateResource({ params: deletePluginParams }),
  deletePluginHandler
);

export default route;
