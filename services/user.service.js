import { errorHandler, formatUtils, generateSelf } from "../utils";
export default class UserService {
    constructor() {}

    async getPostsUser(args) {
        const { user, req, res } = args;
        try {
            formatUtils.contentNegotiator({
                res,
                config: {
                    json() {
                        res.json({
                            data: user.posts.map(postsOne => ({
                                data: postsOne.toJSON(),
                                links: generateSelf({
                                    entity: postsOne.toJSON(),
                                    req
                                })
                            }))
                        });
                    }
                }
            });
        } catch(error) {
            throw errorHandler(error.message, 400);
        }
    }
}