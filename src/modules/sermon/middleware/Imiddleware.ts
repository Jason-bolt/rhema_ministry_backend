import { NextFunction, Request, Response } from "express";

interface IMiddleware {
  validateCreateSermon: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response | void>;
  validateUpdateSermon: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response | void>;
}

export default IMiddleware;
