import { NextFunction, Request, Response } from "express";
import {
  createBlogInput,
  deleteBlogInput,
  getBlogInput,
} from "../schema/blog.schema";
import {
  createBlog,
  deleteBlog,
  getBlog,
} from "../service/blog.service";

export async function ceateBlogHandler(
  req: Request<{}, {}, createBlogInput>,
  res: Response,
  next: NextFunction
) {
  /**
   * DONE: user must be authenticated use isAuth middleware
   * DONE: validate req.body by zod
   * DONE: pass createBlogInput as generator to requesut
   * DONE: call create Blog service function
   */
  try {
    const Blog = await createBlog({
      ...req.body,
      author: {
        _id: res.locals.user._id,
        userName: res.locals.user.userName,
      },
    });
    return res.status(201).send(Blog);
  } catch (error: any) {
    next(error);
  }
}

export async function getBlogHandler(
  req: Request<{}, {}, {}, getBlogInput>,
  res: Response,
  next: NextFunction
) {
  /**
   * DONE: validate user req.query by zod
   * DONE: call get blog service function
   * DONE: if not blog found return 404
   *
   */
  try {
    const blogs = await getBlog(req.query);
    if (!blogs) {
      return res.status(404).send("no blogs found");
    }
    return res.status(200).send(blogs);
  } catch (error) {
    next(error);
  }
}

export async function deleteBlogHandler(
  req: Request<deleteBlogInput>,
  res: Response,
  next: NextFunction
) {
  /**
   * DONE: user must be authenticated and authorized
   * DONE: validate req.query by zod
   * DONE: call delete blog service functionn
   */
  try {
    let blog = await deleteBlog(req.params, res.locals.user._id);
    if (!blog) {
      return res.status(404).send("no blog found");
    }
    return res.status(200).send("deleted succesfully");
  } catch (error: any) {
    next(error);
  }
}
