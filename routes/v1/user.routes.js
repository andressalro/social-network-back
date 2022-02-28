import { userController as v1} from "../../controllers";
import { AsyncWrapper } from "../../utils";

export default router => {
    router.get("/user/posts", AsyncWrapper(v1.getPostsUser));
}
