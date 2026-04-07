import IController from "./Icontroller";
import { Request, Response } from "express";
import userService from "../service";
import IService from "../service/Iservice";
import logger from "../../../../utils/logger";
import { userSignupEmail } from "../../../../utils/helpers/emailTemplates/userEmails";
import { resetCodeEmail } from "../../../../utils/helpers/emailTemplates/resetCodeEmail";
import { sendEmail } from "../../../../config/queue";
import { IUserTokenData } from "../types";

class UserController implements IController {
  constructor(private readonly service: IService) {}

  signUpUser = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      logger.info(`User data: ${JSON.stringify(userData)}`);
      const user = await this.service.signUpUser(req.body);

      delete user.password;

      await sendEmail({
        to: user.email,
        subject: "Welcome to Eternal Rhema Life Ministries",
        html: userSignupEmail(user.name),
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to create user: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const { email } = req?.body as { email: string };
      const { token } = await this.service.loginUser(email.trim());

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: { token },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to login user: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  initiatePasswordReset = async (req: Request, res: Response) => {
    try {
      const { email } = req?.body as { email: string };
      const resetCode = await this.service.initiatePasswordReset(email.trim());

      await sendEmail({
        to: email.trim(),
        subject: "Your Password Reset Code — Eternal Rhema Life Ministries",
        html: resetCodeEmail(resetCode),
      });

      return res.status(200).json({
        success: true,
        message: "A reset code has been sent to your email.",
        data: null,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to initiate password reset: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { password } = req?.body as { password: string };
      const email = (req as any).userEmail as string;

      const userData = await this.service.resetPassword(
        email.trim(),
        password.trim(),
      );

      delete userData.password;

      return res.status(200).json({
        success: true,
        message: "Password has been reset successfully!",
        data: { userData },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to reset password: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };
}

const userController = new UserController(userService);
export default userController;
