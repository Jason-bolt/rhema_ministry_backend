import { Router } from "express";
import galleryController from "./controller";
import galleryMiddleware from "./middleware";
import userMiddleware from "../user/middleware";

const galleryRouterV1 = Router();

galleryRouterV1.get("/count", galleryController.getCount);
galleryRouterV1.get("/", galleryController.getGallery);
galleryRouterV1.post(
  "/",
  userMiddleware.verifyAuthUser,
  galleryMiddleware.validateCreateGalleryGroup,
  galleryController.create,
);
galleryRouterV1.put(
  "/:id",
  userMiddleware.verifyAuthUser,
  galleryMiddleware.validateUpdateGalleryGroup,
  galleryController.update,
);
galleryRouterV1.delete(
  "/:id",
  userMiddleware.verifyAuthUser,
  galleryController.delete,
);

export default galleryRouterV1;
