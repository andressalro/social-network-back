import { PostsService } from "../services";

const postsService = new PostsService();
export const postCreatePosts = async (req, res) => {
    const user = req.user;
    const postsData = req.body;

    const createdPosts = await postsService.postCreatePosts(
        user,
        postsData
    );

    res.status(createdPosts ? 201 : 500).json({ createdPosts });
}

export const getPosts = async (req, res) => {
    postsService.getPosts({
        fields: {
            title: 1,
            description: 1
        },
        req,
        res
    });
}

export const deleteUserPosts = async (req, res, next) => {
    const user = req.user;
    const postsId = req.params.id;
    const postsDeleted = await postsService.deleteUserPosts(user, postsId);
    res.status(postsDeleted ? 200 : 500).json({ postsDeleted });
}