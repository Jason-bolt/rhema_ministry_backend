import { Router } from "express";
import userController from "./controller";
import userMiddleware from "./middleware";

const userRouterV1 = Router();

userRouterV1.post(
  "/signup",
  userMiddleware.validateCreateUser,
  userMiddleware.isUniqueUser,
  userController.signUpUser,
);

userRouterV1.post(
  "/login",
  userMiddleware.validateLoginUser,
  userController.loginUser,
);

userRouterV1.post(
  "/initiate_password_reset",
  userMiddleware.doesUserExistByEmail,
  userController.initiatePasswordReset,
);

userRouterV1.post(
  "/reset_password",
  userMiddleware.confirmResetPasswordToken,
  userMiddleware.validatePasswords,
  userController.resetPassword,
);

export default userRouterV1;
