import express from "express";
import usersValidation from "../../middleware/validation/users-validation.js";
import authController from "../../controllers/auth-controller.js";
import authenticate from "../../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post("/signup", usersValidation.userSignupValidate, authController.signup);

authRouter.post("/signin", usersValidation.userSigninValidate, authController.signin);

authRouter.post("/refresh", usersValidation.userRefreshTokenValidate.authController.refresh);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;
