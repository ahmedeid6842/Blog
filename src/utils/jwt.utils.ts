import jwt from "jsonwebtoken";
import config from "config";

const jwtSecret = config.get<string>("jwtSecret");

export function signJWT(
  payload: Object,
  options?: jwt.SignOptions | undefined
) {
  let token = jwt.sign(payload, jwtSecret, options);
  return token;
}

export function verifyJWT(Token: string): {
  valid: Boolean;
  expired: Boolean;
  decoded: Object | null;
} {
  try {
    const decoded = jwt.verify(Token, jwtSecret);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
