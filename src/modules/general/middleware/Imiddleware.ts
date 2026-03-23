import { NextFunction, Request, Response } from "express";

interface IMiddleware {
    validateContactForm: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}

export default IMiddleware;