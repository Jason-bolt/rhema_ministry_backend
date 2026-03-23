import { Router } from "express";
import generalController from "./controller";
import generalMiddleware from "./middleware";

const generalRouterV1 = Router();

generalRouterV1.post(
  "/contact_form",
  generalMiddleware.validateContactForm,
  generalController.sendContactEmail,
);

export default generalRouterV1;
