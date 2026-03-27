import IController from "./Icontroller";
import { Request, Response } from "express";
import IService from "../service/Iservice";
import sermonService from "../service";
import logger from "../../../../utils/logger";

class SermonController implements IController {
  constructor(private readonly service: IService) {}

  create = async (req: Request, res: Response) => {
    try {
      const sermonData = req.body;
      logger.info(`Sermon data: ${JSON.stringify(sermonData)}`);
      const sermon = await this.service.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Sermon created successfully",
        data: sermon,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to create sermon: ${error.message}`,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
  };

  getSermonsCount = async (req: Request, res: Response) => {
    try {
      const sermonsCount = await this.service.getSermonsCount();

      return res.status(200).json({
        success: true,
        message: "Sermons count fetched successfully",
        data: sermonsCount,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to get sermons count: ${error.message}`,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
  };

  getSermons = async (req: Request, res: Response) => {
    try {
      const sermons = await this.service.getSermons();

      return res.status(200).json({
        success: true,
        message: "Sermons fetched successfully",
        data: sermons,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to get sermons: ${error.message}`,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
  };

  async read(req: Request, res: Response) {
    try {
      return;
    } catch (error) {
      throw new Error("Failed to read user");
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const sermonData = req.body;
      const sermonId = req.params?.id;
      logger.info(
        `Sermon data: ${JSON.stringify(sermonData)}; id: ${sermonId}`,
      );
      const sermon = await this.service.update(sermonId, req.body);

      return res.status(200).json({
        success: true,
        message: "Sermon updated successfully",
        data: sermon,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to update sermon: ${error.message}`,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const sermonId = req.params?.id;
      logger.info(`Sermon id: ${sermonId}`);
      await this.service.delete(sermonId);

      return res.status(200).json({
        success: true,
        message: "Sermon deleted successfully",
        data: null,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to delete sermon: ${error.message}`,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
  };
}

const sermonController = new SermonController(sermonService);
export default sermonController;
