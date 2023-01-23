import { Request, Response } from "express";
import { loginUserInput } from "../schema/user.schema";
import { getUser } from "../service/user.service";
import { signJWT } from "../utils/jwt.utils";
import logger from "../utils/logger";

export async function loginUserHandler(
  req: Request<{}, loginUserInput>,
  res: Response
) {
  /**
   * DONE: validate req.body by zod loginUserSchema
   * DONE: call get user service
   * DONE: call compare password method in mongoose user Schema
   * DONE: generate access Token
   * DONE: logg error
   */
  try {
    let user = await getUser({ email: req.body.email }, true);
    if (!user) {
      return res.status(404).send(`no user found`);
    }

    let valid = await user[0].comparePassword(req.body.password);
    if (!valid) {
      return res.status(404).send(`no user found`);
    }

    let accessToken = signJWT(
      { _id: user[0]._id, userName: user[0].userName },
      { expiresIn: "30m" }
    );

    res.cookie("accessjwt", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.send(`welcome ${user[0].userName}`);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500);
  }
}

export async function logoutUserHandler(req: Request, res: Response) {
  /**
   * DONE: clear user cookie
   */
  res.clearCookie("accessjwt");
  return res.send("logged out");
}
