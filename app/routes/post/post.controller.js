const MainController = require('../home/home.controller');
const ta = require('../../../node_modules/time-ago/timeago');

class PostController extends MainController {
    constructor(data) {
        super(data);
    }

    async getPostInfo(postId) {
        const post = await this.data.posts.getById(postId);
        if (!post) {
            const error = new Error('Post with such id does not exist!');
            return error;
        }
        let tags = await post.getTags();
        if (tags) {
            tags = tags.map((tag) => tag.name || tag.dataValues.name);
        } else {
            tags = null;
        }
        post.createdAgo = ta.ago(post.createdAt);
        post.updatedAgo = ta.ago(post.updatedAt);
        const {
            image,
            name,
            userId,
            subreaditId,
            content,
            id,
            createdAt,
            createdAgo,
            updatedAgo,
        } = post;

        const comments =
            (await this.data.comments.getCommentsOnPost(postId)
                .map(async (item) => {
                    const comment = {};
                    comment.id = item.id || item.dataValues.id;
                    comment.content = item.content || item.dataValues.content;
                    comment.userId = item.userId || item.dataValues.userId;
                    comment.postId = item.postId || item.dataValues.postId;
                    comment.createdAt = item.createdAt ||
                        item.dataValues.createdAt;
                    comment.updatedAt = item.updatedAt ||
                        item.dataValues.updatedAt;
                    comment.createdAgo = ta.ago(comment.createdAt);
                    comment.updatedAgo = ta.ago(comment.updatedAt);
                    comment.user =
                        await this.data.users.getById(comment.userId);
                    comment.userName = comment.user.userName ||
                        comment.user.dataValues.userName;
                    comment.userAvatar = comment.user.avatar ||
                        comment.user.dataValues.avatar;
                    delete comment.user;
                    return comment;
                }));
        const user = await this.data.users.getById(userId);
        if (!user) {
            const error = new Error('User does not exist');
            return error;
        }
        const {
            userName,
        } = user;

        const {
            avatar,
        } = user;

        let subreaditName = await this.data.subreadits.getById(subreaditId);
        subreaditName = subreaditName.name;

        return {
            image,
            name,
            comments,
            userName,
            userId,
            subreaditName,
            tags,
            avatar,
            content,
            id,
            createdAt,
            createdAgo,
            updatedAgo,
        };
    }

    async createNewComment(commentObj) {
        const newComment = await this.data.comments.create(commentObj);
        return newComment;
    }
    async updateComment(updatedComment, id) {
        let updateComment = await this.data.comments.update(updatedComment, id);
        updateComment = await this.data.comments.getById(id);
        return updateComment;
    }
    async deleteComment(id) {
        const comment = await this.data.comments.getById(id);
        await this.data.comments.deleteComment(id);
        return comment;
    }
    async getCommentInfo(id) {
        const commentsInfo = await this.data.comments.getById(id);
        return commentsInfo;
    }
}

module.exports = PostController;
