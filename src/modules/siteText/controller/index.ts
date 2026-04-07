import { Request, Response } from "express";
import siteTextService from "../service";

class SiteTextController {
  getSiteTexts = async (req: Request, res: Response) => {
    try {
      const texts = await siteTextService.getSiteTexts();
      return res.status(200).json({
        success: true,
        message: "Site texts fetched successfully",
        data: texts,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to get site texts: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  updateSiteTexts = async (req: Request, res: Response) => {
    try {
      const texts = await siteTextService.updateSiteTexts(req.body);
      return res.status(200).json({
        success: true,
        message: "Site texts updated successfully",
        data: texts,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to update site texts: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };
}

const siteTextController = new SiteTextController();
export default siteTextController;
