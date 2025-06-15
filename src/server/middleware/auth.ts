import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";
import { handleHttpError } from "../HttpError.ts";

const env = load({
  JWT_SECRET: String,
});

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).end();
      return;
    }
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (decoded.sub) {
      req.params.userId = decoded.sub.toString();
      next();
    } else {
      res.status(403).end();
      return;
    }
  } catch (e) {
    handleHttpError(e, res);
  }
};
