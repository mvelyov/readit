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
        const post = await this.data.posts.getById(postId);
        if (post) {
            const {
                subreaditId,
            } = post;
            const subreadit = await this.data.subreadits.getById(subreaditId);
            const {
                name,
            } = subreadit;
            return {
                subreaditId,
                name,
            };
        }
        const error = new Error('Post with that id does not exist');
        return error;
    }
    async getUserPostsAndComments(username) {
        const user = await this.data.users.findByUserName(username);
        if (!user) {
            const error = new Error('User with that username does not exist');
            return error;
        }
        const {
            id,
            userName,
            avatar,
        } = user;
        let comments = await this.data.comments.getCommentsForEachUser(id);
        comments = await Promise.all(comments.map(async (comment) => {
            comment.id = comment.id || comment.dataValues.id;
            comment.content = comment.content || comment.dataValues.content;
            comment.createdAt = comment.createdAt ||
                comment.dataValues.createdAt;
            comment.updatedAt = comment.updatedAt ||
                comment.dataValues.updatedAt;
            comment.createdAgo = ta.ago(comment.createdAt);
            comment.updatedAgo = ta.ago(comment.updatedAt);
            comment.postId = comment.postId || comment.dataValues.postId;
            comment.postName =
                await this.data.posts.getById(comment.postId);
            comment.postName = comment.postName.name ||
                comment.postName.dataValues.name;
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
            post.id = post.id || post.dataValues.id;
            post.name = post.name || post.dataValues.name;
            post.image = post.image || post.dataValues.image;
            post.subreaditId = post.subreaditId || post.dataValues.subreaditId;
            post.createdAt = post.createdAt || post.dataValues.createdAt;
            post.updatedAt = post.updatedAt || post.dataValues.updatedAt;
            post.createdAgo = ta.ago(post.createdAt);
            post.updatedAgo = ta.ago(post.updatedAt);
            post.subreadit =
                await this.data.subreadits.getById(post.subreaditId);
            post.subreadit = post.subreadit.name ||
                post.subreadit.dataValues.name;
            post.tags = await post.getTags();
            post.tags = post.tags.map((tag) => tag.name || tag.dataValues.name);
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