import { Request, Response } from "express"
import { User } from "../db/User.ts";
import { HttpError, handleHttpError } from "../HttpError.js";
import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";

const env = load({
    JWT_SECRET:String
})

export const createUser = async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body;
        const newUser = new User({
            name: name,
            email: email,
            password: password,
        });
        await newUser.save();
        res.status(201).json(newUser).end();
    } catch(e) {
        handleHttpError(e, res);
    }
};

export const login = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ "email": email }).orFail(new HttpError(400, "Incorrect credentials"));
        if (user.password == createHash("sha256").update(password + user.salt).digest("hex")) {
            const token = jwt.sign({ sub: user._id }, env.JWT_SECRET, { expiresIn: "8h" });
            res.status(200).json({ token: token }).end();
        } else {
            throw new HttpError(400, "Incorrect credentials");
        }
    } catch(e) {
        handleHttpError(e, res);
    }
};

export const viewUserPublic = async (req:Request, res:Response) => {
    try {
        const user = await User.findById(req.params.id).orFail(new HttpError(404, "User not found"));
        res.status(200).json({ name: user.name, lists: user.lists }).end();
    } catch(e) {
        handleHttpError(e, res);
    }
}

export const viewUserPrivate = async (req:Request, res:Response) => {
    try {
        const user = await User.findById(req.params.id).orFail(new HttpError(404, "User not found"));
        res.status(200).json({ name: user.name, email: user.email, lists: user.lists }).end();
    } catch(e) {
        handleHttpError(e, res);
    }
}

export const editUser = async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findById(req.params.id).orFail(new HttpError(404, "User not found"));
        if (name) {
            user.name = name;
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
        await User.findById(req.params.id).deleteOne().orFail(new HttpError(404, "User not found"));
        res.status(200).json({ message: "User successfully deleted" }).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

