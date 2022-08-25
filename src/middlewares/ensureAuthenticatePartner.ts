import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticatePartner(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing",
    });
  }

  //Bearer 943457348-57384578345
  //[0] - Bearer
  //[1] - 943457348-57384578345
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "55681f25f2b5ce8a670140d1dff04da5"
    ) as IPayload;

    request.id_partner = sub;

    return next();
  } catch (err) {
    console.log(err);
    return response.status(401).json({
      message: "Invalid token!",
    });
  }
}
