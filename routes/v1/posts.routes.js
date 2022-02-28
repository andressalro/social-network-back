import { postsController as v1} from "../../controllers";
import { AsyncWrapper } from "../../utils";

export default router => {
    router.post("/posts", AsyncWrapper(v1.postCreatePosts));
    router.get("/posts", AsyncWrapper(v1.getPosts));
    router.delete("/posts/:id", AsyncWrapper(v1.deleteUserPosts));
}
