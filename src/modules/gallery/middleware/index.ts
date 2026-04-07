import { NextFunction, Request, Response } from "express";
import {
  createGalleryGroupSchema,
  updateGalleryGroupSchema,
} from "../../../../config/zod/schemas/gallery";

class GalleryMiddleware {
  async validateCreateGalleryGroup(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const validationResult = createGalleryGroupSchema.safeParse(req.body);
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

  async validateUpdateGalleryGroup(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const validationResult = updateGalleryGroupSchema.safeParse({
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

const galleryMiddleware = new GalleryMiddleware();
export default galleryMiddleware;
