import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses.js";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class List extends TimeStamps implements Base {
  public _id!: Types.ObjectId;
  public id!: string;

  @prop({ required: true, type: String })
  public name!: string;

  @prop({ type: String })
  public description?: string;

  @prop({ type: () => [String] })
  public recipes: string[] = [];
}

export const ListModel = getModelForClass(List);
