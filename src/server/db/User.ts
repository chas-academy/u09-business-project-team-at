import { model, Schema, Types } from "mongoose";
import { createHash, randomBytes } from "crypto";

export interface IUser {
    name:string;
    email:string;
    password:string;
    salt?:string;
    lists:Array<Types.ObjectId>;
}

export const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String },
    lists: [{type: Schema.Types.ObjectId, ref: "List"}]
}, {
    timestamps: true
});

userSchema.pre("save", function(next) { //password hashing
    if (this.isModified("password") || this.isNew) {
        const salt = randomBytes(128).toString("base64");
        const hashedPassword = createHash("sha256")
            .update(this.password + salt)
            .digest("hex");
        this.salt = salt;
        this.password = hashedPassword;
    }
    next();
});

export const User = model("User", userSchema);

