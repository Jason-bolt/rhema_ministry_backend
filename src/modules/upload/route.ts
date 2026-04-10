import { Router } from "express";
import multer from "multer";
import uploadController from "./controller";
import userMiddleware from "../user/middleware";

const upload = multer({ storage: multer.memoryStorage() });
const uploadRouterV1 = Router();

uploadRouterV1.post(
  "/",
  userMiddleware.verifyAuthUser,
  upload.single("file"),
  uploadController.upload,
);

export default uploadRouterV1;
