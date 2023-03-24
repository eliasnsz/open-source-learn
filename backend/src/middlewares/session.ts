import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export interface RequestWithUserData extends Request {
  userData?: jwt.JwtPayload | undefined;
}

dotenv.config();

const jwtVerify = async (req: RequestWithUserData, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.slice(7);
  const SECRET = process.env.JWT_SECRET as string;

  jwt.verify(token as string, SECRET, (err, userData) => {
    if (err) {
      const error = new ForbiddenError({});
      return res.status(error.statusCode).json(error);
    }
    req.userData = userData as jwt.JwtPayload;
    next();
  });

};

const sessionMiddlewares = { jwtVerify };
export default sessionMiddlewares;