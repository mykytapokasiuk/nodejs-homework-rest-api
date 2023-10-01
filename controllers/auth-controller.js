import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Jimp from "jimp";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import User from "../models/User.js";
import HttpError from "../utils/HttpError.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { protocol: "https" });

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
    });

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        avatarURL,
    });
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const { _id: id } = user;
    const payload = {
        id,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    await User.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.json({
        accessToken,
        refreshToken,
    });
};

const getCurrent = async (req, res) => {
    const { name, email } = req.user;
    res.json({
        name,
        email,
    });
};

const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
    res.json({
        message: "Signout success",
    });
};

const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const { id } = jwt.verify(refreshToken, JWT_SECRET);
        const user = await User.findOne({ refreshToken });

        if (!user) {
            throw HttpError(403);
        }
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

        await User.findByIdAndUpdate(id, { accessToken, refreshToken });

        res.json({
            accessToken,
            refreshToken,
        });
    } catch {
        throw HttpError(403);
    }
};

const avatarsPath = path.join("public", "avatars");

const userAvatarUpdate = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const newFileName = `${_id}_${originalname}`;
    const result = path.join(avatarsPath, newFileName);

    const unresizedAvatar = await Jimp.read(tempUpload);
    unresizedAvatar.resize(250, 250);
    await unresizedAvatar.writeAsync(tempUpload);

    await fs.rename(tempUpload, result);

    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
        avatarURL,
    });
};

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    refresh: ctrlWrapper(refresh),
    userAvatarUpdate: ctrlWrapper(userAvatarUpdate),
};
