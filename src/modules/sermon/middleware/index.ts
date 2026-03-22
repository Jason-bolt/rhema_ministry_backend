import { NextFunction, Request, Response } from "express";
import IMiddleware from "./Imiddleware";
import {
  createSermonSchema,
  updateSermonSchema,
} from "../../../../config/zod/schemas/sermon";

class SermonMiddleware implements IMiddleware {
  async validateCreateSermon(req: Request, res: Response, next: NextFunction) {
    const validationResult = createSermonSchema.safeParse(req.body);
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

  async validateUpdateSermon(req: Request, res: Response, next: NextFunction) {
    const validationResult = updateSermonSchema.safeParse({
      ...req.body,
      ...req.params,
    });
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

const sermonMiddleware = new SermonMiddleware();

export default sermonMiddleware;
