import { NextFunction, Request, Response } from "express";
import IMiddleware from "./Imiddleware";
import { contactFormSchema } from "../../../../config/zod/schemas/general";

class GeneralMiddleware implements IMiddleware {
  async validateContactForm(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    const validationResult = contactFormSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.error.issues
          .map((issue) => issue.message)
          .join(", "),
      });
    }
    return next();
  }
}

const generalMiddleware = new GeneralMiddleware();

export default generalMiddleware;
