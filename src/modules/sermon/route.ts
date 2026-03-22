import { Router } from "express";
import sermonController from "./controller";
import sermonMiddleware from "./middleware";
import userMiddleware from "../user/middleware";

const sermonRouterV1 = Router();

sermonRouterV1.post(
  "/",
  userMiddleware.verifyAuthUser,
  sermonMiddleware.validateCreateSermon,
  sermonController.create,
);
sermonRouterV1.put(
  "/:id",
  userMiddleware.verifyAuthUser,
  sermonMiddleware.validateUpdateSermon,
  sermonController.update,
);
sermonRouterV1.get("/count", sermonController.getSermonsCount);
sermonRouterV1.get("/", sermonController.getSermons);
sermonRouterV1.delete(
  "/:id",
  userMiddleware.verifyAuthUser,
  sermonController.delete,
);

export default sermonRouterV1;
