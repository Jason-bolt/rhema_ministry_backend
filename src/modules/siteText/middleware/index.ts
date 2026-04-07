import { NextFunction, Request, Response } from "express";
import { updateSiteTextsSchema } from "../../../../config/zod/schemas/siteText";

class SiteTextMiddleware {
  async validateUpdateSiteTexts(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const validationResult = updateSiteTextsSchema.safeParse(req.body);
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

const siteTextMiddleware = new SiteTextMiddleware();
export default siteTextMiddleware;
