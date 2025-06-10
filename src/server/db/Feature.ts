import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses.js";
import { Types } from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

export class Feature extends TimeStamps implements Base {
  public _id!: Types.ObjectId;
  public id!: string;

  @prop({ required: true, type: String })
  public header!: string;

  @prop({ required: true, type: String })
  public category!: string;

  @prop({ required: true, type: String })
  public body!: string;

  @prop({ type: String })
  public linkText?: string;

  @prop({ type: String })
  public ref?: string;
}

export const FeatureModel = getModelForClass(Feature);
