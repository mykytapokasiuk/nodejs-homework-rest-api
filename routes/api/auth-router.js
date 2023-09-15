import express from "express";
import usersValidation from "../../middleware/validation/users-validation.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", usersValidation.userSignupValidate, authController.signup);

export default authRouter;
