import { Router } from "express";
import userRouterV1 from "../../modules/user/route";
import sermonRouterV1 from "../../modules/sermon/route";

const v1Router = Router();

v1Router.use("/users", userRouterV1);
v1Router.use("/sermons", sermonRouterV1);

export default v1Router;
