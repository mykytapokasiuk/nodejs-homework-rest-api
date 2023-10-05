import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            match: emailRegexp,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            minlength: 6,
            required: [true, "Set password for user"],
        },
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        avatarURL: String,
        verify: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidateAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
