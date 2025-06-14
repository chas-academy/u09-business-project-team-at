import { Request, Response } from "express"
import { UserModel } from "../db/User.ts";
import { HttpError, handleHttpError } from "../HttpError.js";
import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";
import { ListModel } from "../db/List.ts";

const env = load({
    JWT_SECRET:String
})

export const createUser = async (req:Request, res:Response) => {
    try {
        const {username, email, password} = req.body;
        const newUser = new UserModel({
            username: username,
            email: email,
            password: password,
        });
        if (!newUser.username || !newUser.email || !newUser.password) {
            throw new HttpError(400, "Username, email and password are required");
        }
        if (await UserModel.exists({ "username": newUser.username })) {
            throw new HttpError(400, "Username already exists");
        }

        await newUser.save();

        const token = jwt.sign({ sub: newUser._id }, env.JWT_SECRET, { expiresIn: "8h" });
        res.status(201).json({ token: token, user: newUser.toJSON() }).end();
    } catch(e) {
        handleHttpError(e, res);
    }
};

export const login = async (req:Request, res:Response) => {
    try {
        const {username, password} = req.body;
        const user = await UserModel.findOne({ "username": username }).orFail(new HttpError(400, "Incorrect credentials"));
        if (user.password == createHash("sha256").update(password + user.salt).digest("hex")) {
            const token = jwt.sign({ sub: user._id }, env.JWT_SECRET, { expiresIn: "8h" });
            res.status(200).json({ token: token, user: user.toJSON() }).end();
        } else {
            throw new HttpError(400, "Incorrect credentials");
        }
    } catch(e) {
        handleHttpError(e, res);
    }
};

export const viewUserPublic = async (req:Request, res:Response) => {
    try {
        const user = await UserModel.findById(req.params.id).orFail(new HttpError(404, "User not found"));
        res.status(200).json({ username: user.username, lists: user.lists }).end();
    } catch(e) {
        handleHttpError(e, res);
    }
}

export const viewUserPrivate = async (req:Request, res:Response) => {
    try {
        const user = await UserModel.findById(req.params.id).orFail(new HttpError(404, "User not found"));
        res.status(200).json({ username: user.username, email: user.email, lists: user.lists }).end();
    } catch(e) {
        handleHttpError(e, res);
    }
};

export const editUser = async (req:Request, res:Response) => {
    try {
        const {username, email, password} = req.body;
        const user = await UserModel.findById(req.params.id).orFail(new HttpError(404, "User not found"));
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        await user.save();
        res.status(200).json(user).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export const deleteUser = async (req:Request, res:Response) => {
    try {
        const user = await UserModel.findById(req.params.id).orFail(new HttpError(404, "User not found"));
        user.lists.forEach(async (list) => {
            await ListModel.findById(list).deleteOne();
        });
        await user.deleteOne();
        res.status(200).json({ message: "User successfully deleted" }).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

