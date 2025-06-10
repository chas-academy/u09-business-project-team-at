import { model, Schema, Types } from "mongoose";

export interface IUser {
    name:string;
    email:string;
    password:string;
    lists:Array<Types.ObjectId>;
}

export const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lists: [{type: Schema.Types.ObjectId, ref: "List"}]
}, {
    timestamps: true
});

export const User = model("User", userSchema);

