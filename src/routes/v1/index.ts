import { Router } from "express";
import userRouterV1 from "../../modules/user/route";
import sermonRouterV1 from "../../modules/sermon/route";
import eventRouterV1 from "../../modules/event/route";
import galleryRouterV1 from "../../modules/gallery/route";
import siteTextRouterV1 from "../../modules/siteText/route";
import generalRouterV1 from "../../modules/general/route";

const v1Router = Router();

v1Router.use("/users", userRouterV1);
v1Router.use("/sermons", sermonRouterV1);
v1Router.use("/events", eventRouterV1);
v1Router.use("/gallery", galleryRouterV1);
v1Router.use("/site-texts", siteTextRouterV1);
v1Router.use("/general", generalRouterV1);

export default v1Router;
