import {Posts, User} from "../models";
import { errorHandler, formatUtils, generateSelf } from "../utils";
export default class PostsService {
    constructor() {}

    async postCreatePosts(user, postsData) {        
        const userId = user._id;
        console.log(userId);
        const newPosts = new Posts(postsData);
        try {
            const insertedPosts = await newPosts.save();
            const result = await User.updateOne(
                { _id: userId },
                {
                    $addToSet: { posts: insertedPosts._id }
                }
              ).select({
                firstName: 1,
                lastName: 1,
                primaryEmailAddress: 1,
                contacts: 1
              });
              console.log(result);
            return result.matchedCount === 1 && result.modifiedCount > 0;
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
            console.log(result);
            if(result.deletedCount > 0) {
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