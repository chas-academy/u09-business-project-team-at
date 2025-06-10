import { Types } from "mongoose";
import { createHash, randomBytes } from "crypto";
import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses.js";
import { List } from "./List.ts";

@pre<User>("save", function(next) { //password hashing
    if (this.isModified("password") || this.isNew) {
        const salt = randomBytes(128).toString("base64");
        const hashedPassword = createHash("sha256")
            .update(this.password + salt)
            .digest("hex");
        this.salt = salt;
        this.password = hashedPassword;
    }
    next();
})
export class User extends TimeStamps implements Base {
    public _id!: Types.ObjectId;
    public id!: string;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true })
    public password!: string;

    @prop()
    public salt?: string;

    @prop({ ref: () => List })
    public lists: Ref<List>[] = [];
}

export const UserModel = getModelForClass(User);

