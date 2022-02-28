import { Router } from "express";
import setPostsV1 from "./posts.routes";
import setUserV1 from "./user.routes";
import { RouteProtectorMiddleware } from "../../middlewares";

const router = Router();

router.use(new RouteProtectorMiddleware().authenticate());

setPostsV1(router);
setUserV1(router);

export const routerV1 = {
    baseUrl: "/api/v1",
    router
}