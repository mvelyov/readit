const ta = require('../../../node_modules/time-ago/timeago');
class UserController {
    constructor(data) {
        this.data = data;
    }
    async createUser(userObject) {
        try {
            const newUser = await this.data.users.create(userObject);
            return {
                newUser,
            };
        } catch (error) {
            return {
                errors: error.message + ': User already exists!',
            };
        }
    }
    async getSubreaditNameByPostId(postId) {
        const {
            subreaditId,
        } = await this.data.posts.getById(postId);
        const {
            name,
        } = await this.data.subreadits.getById(subreaditId);
        return {
            subreaditId,
            name,
        };
    }
    async getUserPostsAndComments(username) {
        const {
            id,
            userName,
            avatar,
        } = await this.data.users.findByUserName(username);

        let comments = await this.data.comments.getCommentsForEachUser(id);
        comments = await Promise.all(comments.map(async (comment) => {
            comment.id = comment.dataValues.id;
            comment.content = comment.dataValues.content;
            comment.createdAt = comment.dataValues.createdAt;
            comment.updatedAt = comment.dataValues.updatedAt;
            comment.createdAgo = ta.ago(comment.createdAt);
            comment.updatedAgo = ta.ago(comment.updatedAt);
            comment.postId = comment.dataValues.postId;
            comment.postName =
                await this.data.posts.getById(comment.postId);
            comment.postName = comment.postName.dataValues.name;
            const {
                subreaditId,
                name,
            } = await this.getSubreaditNameByPostId(comment.postId);
            comment.subreaditName = name;
            comment.subreaditId = subreaditId;
            return comment;
        }));
        let posts = await this.data.posts.getAllPostsByUserId(id);
        posts = await Promise.all(posts.map(async (post) => {
            post.id = post.dataValues.id;
            post.name = post.dataValues.name;
            post.image = post.dataValues.image;
            post.createdAgo = ta.ago(post.dataValues.createdAt);
            post.updatedAgo = ta.ago(post.dataValues.updatedAt);
            post.subreadit =
                await this.data.subreadits.getById(post.dataValues.subreaditId);
            post.subreadit = post.subreadit.dataValues.name;
            post.tags = await post.getTags();
            post.tags = post.tags.map((tag) => tag.dataValues.name);
            return post;
        }));

        return {
            id,
            userName,
            avatar,
            comments,
            posts,
        };
    }
}

module.exports = UserController;
