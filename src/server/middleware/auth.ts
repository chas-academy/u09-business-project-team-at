import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";
import { handleHttpError, HttpError } from "../HttpError.ts";
import { UserModel } from "../db/User.ts";

const env = load({
    JWT_SECRET:String,
});

export const authorize = async (req:Request, res:Response, next:NextFunction) => {
    try {
        await UserModel.findById(req.params.id).orFail(new HttpError(404, "User not found"));
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(401).end();
            return;
        }
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if (decoded.sub == req.params.id) {
            next();
        } else {
            res.status(403).end();
            return;
        }
    } catch (e) {
        handleHttpError(e, res);
    }
};