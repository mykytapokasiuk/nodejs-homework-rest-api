import express from "express";
import usersValidation from "../../middleware/validation/users-validation.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", usersValidation.userSignupValidate, authController.signup);

authRouter.post("/signin", usersValidation.userSigninValidate, authController.signin);

export default authRouter;
