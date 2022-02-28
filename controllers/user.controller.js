import { UserService } from "../services";

const userService = new UserService();

export const getPostsUser = async (req, res) => {
    const user = req.user;

    userService.getPostsUser({
        user,
        req,
        res
    });
}