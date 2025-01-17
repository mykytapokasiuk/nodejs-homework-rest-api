import express from "express";
import usersValidation from "../../middleware/validation/users-validation.js";
import authController from "../../controllers/auth-controller.js";
import authenticate from "../../middleware/authenticate.js";
import upload from "../../middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/signup", usersValidation.userSignupValidate, authController.signup);

authRouter.get("/verify/:verificationCode", authController.verify);

authRouter.post("/verify", usersValidation.userEmailValidate, authController.resendVerifyEmail);

authRouter.post("/signin", usersValidation.userSigninValidate, authController.signin);

authRouter.post("/refresh", usersValidation.userRefreshTokenValidate, authController.refresh);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
    "/users/avatars",
    authenticate,
    upload.single("avatar"),
    authController.userAvatarUpdate
);

export default authRouter;
