import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses.js";
import { Types } from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

export class Feature extends TimeStamps implements Base {
    public _id!: Types.ObjectId;
    public id!: string;

    @prop({ required: true })
    public header!: string;

    @prop({ required: true })
    public category!: string;

    @prop({ required: true })
    public body!: string;

    @prop()
    public linkText?: string;

    @prop()
    public ref?: string;
}

export const FeatureModel = getModelForClass(Feature);