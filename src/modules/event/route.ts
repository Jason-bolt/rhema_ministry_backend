import { Router } from "express";
import eventController from "./controller";
import eventMiddleware from "./middleware";
import userMiddleware from "../user/middleware";

const eventRouterV1 = Router();

eventRouterV1.get("/count", eventController.getCount);
eventRouterV1.get("/", eventController.getEvents);
eventRouterV1.post(
  "/",
  userMiddleware.verifyAuthUser,
  eventMiddleware.validateCreateEvent,
  eventController.create,
);
eventRouterV1.put(
  "/:id",
  userMiddleware.verifyAuthUser,
  eventMiddleware.validateUpdateEvent,
  eventController.update,
);
eventRouterV1.delete(
  "/:id",
  userMiddleware.verifyAuthUser,
  eventController.delete,
);

export default eventRouterV1;
