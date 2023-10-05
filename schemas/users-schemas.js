import Joi from "joi";
import { emailRegexp } from "../models/User.js";

const userSignupSchema = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "missing field username",
    }),
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": "missing field email",
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "missing field password",
    }),
});

const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": "missing field email",
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "missing field password",
    }),
});

const userRefreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": "missing field email",
    }),
});

export default {
    userSignupSchema,
    userSigninSchema,
    userRefreshTokenSchema,
    userEmailSchema,
};
