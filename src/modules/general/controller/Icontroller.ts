import { Request, Response } from "express";

interface IController {
  sendContactEmail: (req: Request, res: Response) => Promise<Response>;
  read: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
}

export default IController;