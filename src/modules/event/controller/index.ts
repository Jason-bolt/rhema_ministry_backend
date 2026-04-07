import { Request, Response } from "express";
import eventService from "../service";
import logger from "../../../../utils/logger";

class EventController {
  create = async (req: Request, res: Response) => {
    try {
      const event = await eventService.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Event created successfully",
        data: event,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to create event: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  getCount = async (req: Request, res: Response) => {
    try {
      const result = await eventService.getCount();
      return res.status(200).json({
        success: true,
        message: "Events count fetched successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to get events count: ${error.message}`,
      });
    }
  };

  getEvents = async (req: Request, res: Response) => {
    try {
      const events = await eventService.getEvents();
      return res.status(200).json({
        success: true,
        message: "Events fetched successfully",
        data: events,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to get events: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const eventId = req.params?.id;
      logger.info(`Updating event ${eventId}: ${JSON.stringify(req.body)}`);
      const event = await eventService.update(eventId, req.body);
      return res.status(200).json({
        success: true,
        message: "Event updated successfully",
        data: event,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to update event: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const eventId = req.params?.id;
      logger.info(`Deleting event ${eventId}`);
      await eventService.delete(eventId);
      return res.status(200).json({
        success: true,
        message: "Event deleted successfully",
        data: null,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to delete event: ${error.message}`,
        error: { message: error.message, stack: error.stack },
      });
    }
  };
}

const eventController = new EventController();
export default eventController;
