import { Router } from "express";
import siteTextController from "./controller";
import siteTextMiddleware from "./middleware";
import userMiddleware from "../user/middleware";

const siteTextRouterV1 = Router();

siteTextRouterV1.get("/", siteTextController.getSiteTexts);
siteTextRouterV1.put(
  "/",
  userMiddleware.verifyAuthUser,
  siteTextMiddleware.validateUpdateSiteTexts,
  siteTextController.updateSiteTexts,
);

export default siteTextRouterV1;
