import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses.js";
import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import { Types } from "mongoose";

@pre<List>("save", function (next) {
  if (this.isModified("recipes")) {
    this.recipes = [...new Set(this.recipes)];
    this.recipes = this.recipes.filter((i) => i.length > 0);
  }
  next();
})
export class List extends TimeStamps implements Base {
  public _id!: Types.ObjectId;
  public id!: string;

  @prop({ required: true, type: String })
  public name!: string;

  @prop({ type: () => [String] })
  public recipes: string[] = [];

  @prop({ type: Boolean, default: false })
  public isDeleted!: boolean;

  @prop({ type: Date })
  public deletedAt?: Date;
}

export const ListModel = getModelForClass(List);
