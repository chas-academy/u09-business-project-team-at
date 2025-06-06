import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses.js";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class List extends TimeStamps implements Base {
    public _id!: Types.ObjectId;
    public id!: string;

    @prop({ required: true })
    public name!: string;

    @prop()
    public description?: string;

    @prop({ type: () => [String] })
    public recipies: string[] = [];
}

export const ListModel = getModelForClass(List);