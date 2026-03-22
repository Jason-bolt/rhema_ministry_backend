import { Request, Response } from "express";

interface IController {
  create: (req: Request, res: Response) => Promise<Response>;
  getSermonsCount: (req: Request, res: Response) => Promise<Response>;
  getSermons: (req: Request, res: Response) => Promise<Response>;
  read: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
}

export default IController;
