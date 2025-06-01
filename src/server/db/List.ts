import { model, Schema } from "mongoose";

export interface IList {
    name:string;
    desc:string;
    recipies:Array<string>;
}

export const listSchema = new Schema<IList>({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    recipies: { type: [String], required: true },
}, {
    timestamps: true
});

export const List = model("List", listSchema);