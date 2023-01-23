import { NextFunction, Request, Response } from "express";
import {
  createPluginInput,
  deletePluginInput,
  getPluginInput,
} from "../schema/plugin.schema";
import {
  createPlugin,
  deletePlugin,
  getPlugin,
} from "../service/plugin.service";
export async function ceatePluginHandler(
  req: Request<{}, {}, createPluginInput>,
  res: Response,
  next: NextFunction
) {
  /**
   * DONE: user must be authenticated use isAuth middleware
   * DONE: validate req.body by zod
   * DONE: pass createPluginInput as generator to requesut
   * DONE: call create Plugin service function
   */
  try {
    const Plugin = await createPlugin({
      ...req.body,
      author: {
        _id: res.locals.user._id,
        userName: res.locals.user.userName,
      },
    });
    return res.status(201).send(Plugin);
  } catch (error: any) {
    next(error);
  }
}

export async function getPluginHandler(
  req: Request<{}, {}, {}, getPluginInput>,
  res: Response,
  next: NextFunction
) {
  /**
   * DONE: validate user req.query by zod
   * DONE: call get plugin service function
   * DONE: if not plugin found return 404
   *
   */
  try {
    const plugins = await getPlugin(req.query);
    if (!plugins) {
      return res.status(404).send("no plugins found");
    }
    return res.status(200).send(plugins);
  } catch (error) {
    next(error);
  }
}

export async function deletePluginHandler(
  req: Request<deletePluginInput>,
  res: Response,
  next: NextFunction
) {
  /**
   * DONE: user must be authenticated and authorized
   * DONE: validate req.query by zod
   * DONE: call delete plugin service functionn
   */
  try {
    let plugin = await deletePlugin(req.params, res.locals.user._id);
    if (!plugin) {
      return res.status(404).send("no plugin found");
    }
    return res.status(200).send("deleted succesfully");
  } catch (error: any) {
    next(error);
  }
}
