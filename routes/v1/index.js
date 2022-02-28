import { Router } from "express";
import setPostsV1 from "./posts.routes";
import setUserV1 from "./user.routes";
const router = Router();

setPostsV1(router);
setUserV1(router);

export const routerV1 = {
    baseUrl: "/api/v1",
    router
}