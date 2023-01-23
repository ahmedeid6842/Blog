//check if user is authenticated and deseralize user
import { verifyJWT } from "../utils/jwt.utils";
import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { accessjwt } = req.cookies;
  if (!accessjwt) return res.status(401).send("no token provided");

  const { valid, expired, decoded } = verifyJWT(accessjwt);
  if (!valid) {
    if (expired) {
      return res.status(400).send("you session has ended please log again");
    }
    return res.status(400).send("invalid token");
  }

  res.locals.user = decoded;
  return next();
};
