import { Router } from "express";
import {
  ceateBlogHandler,
  getBlogHandler,
  deleteBlogHandler,
} from "../controller/blog.controller";
import { isAuth } from "../middleware/isAuth";
import validateResource from "../middleware/validateResource";
import {
  createBlogSchema,
  getBlogQuery,
  deleteBlogParams,
} from "../schema/blog.schema";

const route = Router();

//DONE: route -> create a new blog , autheticated user
route.post(
  "/",
  isAuth,
  validateResource({ body: createBlogSchema }),
  ceateBlogHandler
);

//DONE: route[query] -> get pulgin by title or id or author
route.get("/", validateResource({ query: getBlogQuery }), getBlogHandler);

//DONE: route[params] -> delete blog by it's id , authorized user
route.delete(
  "/:id",
  isAuth,
  validateResource({ params: deleteBlogParams }),
  deleteBlogHandler
);

export default route;
