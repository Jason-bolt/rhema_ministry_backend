import { NextFunction, Request, Response } from "express";
import {
  createEventSchema,
  updateEventSchema,
} from "../../../../config/zod/schemas/event";

class EventMiddleware {
  async validateCreateEvent(req: Request, res: Response, next: NextFunction) {
    const validationResult = createEventSchema.safeParse(req.body);
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

  async validateUpdateEvent(req: Request, res: Response, next: NextFunction) {
    const validationResult = updateEventSchema.safeParse({
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

const eventMiddleware = new EventMiddleware();
export default eventMiddleware;
