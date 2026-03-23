import IController from "./Icontroller";
import { Request, Response } from "express";
import IService from "../service/Iservice";
import generalService from "../service";
import { sendEmail } from "../../../../config/queue";
import { contactFormEmail } from "../../../../utils/helpers/emailTemplates/contactFormEmail";
import envs from "../../../../config/envs";

class GeneralController implements IController {
  constructor(private readonly service: IService) {}

  sendContactEmail = async (req: Request, res: Response) => {
    try {
      const { senderName, senderEmail, subject, message } = req.body;
      sendEmail({
        to: envs.ADMIN_EMAIL_ADDRESS,
        subject: "Message from contact form",
        html: contactFormEmail(senderName, senderEmail, subject, message),
      });

      await this.service.sendContactEmail(
        senderName,
        senderEmail,
        subject,
        message,
      );

      return res.status(201).json({
        success: true,
        message: "Contact message saved successfully!",
        data: {},
      });
    } catch (error: any) {
      throw new Error("Failed to save contact form");
    }
  };

  async read(req: Request, res: Response) {
    try {
      return;
    } catch (error: any) {
      throw new Error("Failed to read user");
    }
  }

  async update(req: Request, res: Response) {
    try {
      return;
    } catch (error: any) {
      throw new Error("Failed to update user");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      return;
    } catch (error: any) {
      throw new Error("Failed to delete user");
    }
  }
}

const generalController = new GeneralController(generalService);
export default generalController;
