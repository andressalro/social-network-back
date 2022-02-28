import {Posts} from "../models";
import { errorHandler, formatUtils, generateSelf } from "../utils";
export default class PostsService {
    constructor() {}

    async postCreatePosts(postsData) {
        const newPosts = new Posts(postsData);
        try {
            const insertedPosts = await newPosts.save();
            return Boolean(insertedPosts);
        } catch (error) {
           throw errorHandler(error.message, 400);
        }
    }

    async getPosts(args) {
        const { fields, req, res } = args;
        try {
            const posts = fields
                ? await Posts.find().select(fields)
                : await Posts.find();
            formatUtils.contentNegotiator({
                res,
                config: {
                    json() {
                        res.json({
                            data: posts.map(postsOne => ({
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

    async deleteUserPosts(user, postsId) {
        const userFound = user.posts.find(
            postsOne => postsOne.toString() === postsId
        );
        
        if(userFound) {
            const result = await Posts.deleteOne({
                _id: postsId
            });
        
            if(result.ok === 1 && result.deletedCount > 0) {
                user.posts = user.posts.filter(
                    postsOne => postsOne.toString() !== postsId
                );
                
                try {
                    const userUpdated = await user.save();
                    return Boolean(userUpdated);
                } catch(error) {
                    throw errorHandler(error.message, 400);
                }
                
            }
        }
    }
}