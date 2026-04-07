import { Request, Response } from "express";
import galleryService from "../service";
import logger from "../../../../utils/logger";

class GalleryController {
  create = async (req: Request, res: Response) => {
    try {
      const group = await galleryService.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Gallery group created successfully",
        data: group,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to create gallery group: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  getCount = async (req: Request, res: Response) => {
    try {
      const result = await galleryService.getCount();
      return res.status(200).json({
        success: true,
        message: "Gallery count fetched successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to get gallery count: ${error.message}`,
      });
    }
  };

  getGallery = async (req: Request, res: Response) => {
    try {
      const groups = await galleryService.getGallery();
      return res.status(200).json({
        success: true,
        message: "Gallery fetched successfully",
        data: groups,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to get gallery: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const groupId = req.params?.id;
      logger.info(`Updating gallery group ${groupId}`);
      const group = await galleryService.update(groupId, req.body);
      return res.status(200).json({
        success: true,
        message: "Gallery group updated successfully",
        data: group,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to update gallery group: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const groupId = req.params?.id;
      logger.info(`Deleting gallery group ${groupId}`);
      await galleryService.delete(groupId);
      return res.status(200).json({
        success: true,
        message: "Gallery group deleted successfully",
        data: null,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to delete gallery group: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };
}

const galleryController = new GalleryController();
export default galleryController;
