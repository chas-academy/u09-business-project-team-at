import { Types } from "mongoose";
import { createHash, randomBytes } from "crypto";
import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses.js";
import { List } from "./List.ts";

@pre<User>("save", function (next) {
  //password hashing
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

  @prop({ required: true, type: String })
  public username!: string;

  @prop({ required: true, type: String })
  public email!: string;

  @prop({ type: String })
  public password?: string;

  @prop({ type: String })
  public googleID?: string;

  @prop({ type: String })
  public salt?: string;

  @prop({ ref: () => List, type: () => [List] })
  public lists: Ref<List>[] = [];

  public toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      lists: this.lists,
    };
  }
}

export const UserModel = getModelForClass(User);
