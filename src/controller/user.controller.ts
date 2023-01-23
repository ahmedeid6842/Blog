import { Request, Response } from "express";
import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import { UserDocument } from "../model/user.models";
import { createUserInput, getUserInput } from "../schema/user.schema";
import { createUser, getUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput>,
  res: Response
) {
  try {
    /**
     * DONE: validate req.body by zod create user schema
     * DONE: pass createUserInput  as generator to Request
     * DONE: call create user service
     * DONE: log error using winston
     */
    const user = await createUser(omit(req.body, "passwordConfirmation"));
    return res.send(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500);
  }
}


export async function getUserHandler(
  req: Request<
    {},
    DocumentDefinition<Omit<UserDocument[], "comparePassword" | "password">>,
    {},
    getUserInput
  >,
  res: Response
) {
  /**
   * DONE: validate req.query by zod getUserQuery
   * DONE: pass UserDocument as generator response and getUserinput and genertor query
   * DONE: call get user service
   * DONE: logg error
   */ try {
    const user = await getUser(req.query);
    if (!user) {
      return res.status(404).send(`no user with ${req.query}`);
    }
    return res.send(user);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500);
  }
}
